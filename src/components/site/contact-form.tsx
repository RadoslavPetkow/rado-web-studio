"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import { en } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/locales";
import { defaultLocale, localizedPath } from "@/i18n/locales";
import { trackEvent } from "@/lib/analytics";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type FormValues = {
  fullName: string;
  email: string;
  businessName: string;
  businessType: string;
  serviceNeeded: string;
  budgetRange: string;
  timeline: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  businessName: "",
  businessType: "",
  serviceNeeded: "",
  budgetRange: "",
  timeline: "",
  message: "",
};

const requiredFields: Array<keyof FormValues> = [
  "fullName",
  "email",
  "businessName",
  "businessType",
  "serviceNeeded",
  "budgetRange",
  "timeline",
  "message",
];

export function ContactForm({
  className,
  dictionary = en,
  locale = defaultLocale,
  localized = false,
}: {
  className?: string;
  dictionary?: Dictionary;
  locale?: Locale;
  localized?: boolean;
}) {
  const router = useRouter();
  const formCopy = dictionary.form;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  const mailtoHref = useMemo(() => {
    const subject = `Project request from ${values.fullName || "Rado Web Studio website"}`;
    const body = [
      `${formCopy.fields.fullName}: ${values.fullName}`,
      `${formCopy.fields.email}: ${values.email}`,
      `${formCopy.fields.businessName}: ${values.businessName}`,
      `${formCopy.fields.businessType}: ${values.businessType}`,
      `${formCopy.fields.serviceNeeded}: ${values.serviceNeeded}`,
      `${formCopy.fields.budgetRange}: ${values.budgetRange}`,
      `${formCopy.fields.timeline}: ${values.timeline}`,
      "",
      `${formCopy.fields.message}:`,
      values.message,
    ].join("\n");

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [formCopy, values]);

  function updateField(field: keyof FormValues, value: string) {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("contact_form_started", { field });
    }

    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
    setStatusMessage("");
  }

  function validate() {
    const nextErrors: FormErrors = {};

    for (const field of requiredFields) {
      if (!values[field].trim()) {
        nextErrors[field] = `${formCopy.fields[field]} ${formCopy.errors.required}`;
      }
    }

    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = formCopy.errors.invalidEmail;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      setStatus("error");
      setStatusMessage(formCopy.errors.completeRequired);
      return;
    }

    setStatus("loading");
    setStatusMessage("");
    await saveProjectRequest(values);

    if (!formspreeEndpoint) {
      trackEvent("contact_form_mailto_fallback_used", {
        service: values.serviceNeeded,
        budget: values.budgetRange,
        timeline: values.timeline,
      });
      window.location.href = mailtoHref;
      setStatus("success");
      setStatusMessage(formCopy.mailtoSuccess);
      return;
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          source: siteConfig.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setValues(initialValues);
      setStatus("success");
      trackEvent("contact_form_submitted_successfully", {
        service: values.serviceNeeded,
        budget: values.budgetRange,
        timeline: values.timeline,
      });
      router.push(localized ? localizedPath(locale, "/thank-you") : "/thank-you");
    } catch {
      setStatus("error");
      setStatusMessage(`${formCopy.errors.failed} ${siteConfig.email}.`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl shadow-zinc-950/5 sm:p-6",
        className
      )}
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          id="fullName"
          label={formCopy.fields.fullName}
          value={values.fullName}
          error={errors.fullName}
          onChange={(value) => updateField("fullName", value)}
          autoComplete="name"
        />
        <TextField
          id="email"
          label={formCopy.fields.email}
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => updateField("email", value)}
          autoComplete="email"
        />
        <TextField
          id="businessName"
          label={formCopy.fields.businessName}
          value={values.businessName}
          error={errors.businessName}
          onChange={(value) => updateField("businessName", value)}
          autoComplete="organization"
        />
        <TextField
          id="businessType"
          label={formCopy.fields.businessType}
          value={values.businessType}
          error={errors.businessType}
          onChange={(value) => updateField("businessType", value)}
          placeholder={formCopy.placeholders.businessType}
        />
        <SelectField
          id="serviceNeeded"
          label={formCopy.fields.serviceNeeded}
          value={values.serviceNeeded}
          error={errors.serviceNeeded}
          placeholder={formCopy.placeholders.serviceNeeded}
          options={formCopy.services}
          onChange={(value) => updateField("serviceNeeded", value)}
        />
        <SelectField
          id="budgetRange"
          label={formCopy.fields.budgetRange}
          value={values.budgetRange}
          error={errors.budgetRange}
          placeholder={formCopy.placeholders.budgetRange}
          options={formCopy.budgets}
          onChange={(value) => updateField("budgetRange", value)}
        />
        <SelectField
          id="timeline"
          label={formCopy.fields.timeline}
          value={values.timeline}
          error={errors.timeline}
          placeholder={formCopy.placeholders.timeline}
          options={formCopy.timelines}
          onChange={(value) => updateField("timeline", value)}
        />
      </div>

      <div className="mt-5 grid gap-2">
        <Label htmlFor="message">{formCopy.fields.message}</Label>
        <Textarea
          id="message"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder={formCopy.placeholders.message}
          className="min-h-32 resize-y bg-white"
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? (
          <p className="text-sm text-red-600">{errors.message}</p>
        ) : null}
      </div>

      {statusMessage ? (
        <div
          className={cn(
            "mt-5 flex gap-3 rounded-lg border p-4 text-sm",
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          )}
        >
          {status === "success" ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
          )}
          <p>{statusMessage}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-zinc-500">
          {formCopy.trust}
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="h-12 rounded-lg bg-zinc-950 px-5"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          {formCopy.submit}
        </Button>
      </div>
    </form>
  );
}

async function saveProjectRequest(values: FormValues) {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("project_requests").insert({
      user_id: user?.id ?? null,
      name: values.fullName,
      email: values.email,
      business_name: values.businessName,
      business_type: values.businessType,
      service_needed: values.serviceNeeded,
      budget_range: values.budgetRange,
      timeline: values.timeline,
      message: values.message,
    });
  } catch {
    // The visible request flow still works through Formspree or mailto.
  }
}

type TextFieldProps = {
  id: keyof FormValues;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
};

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: TextFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 bg-white"
        aria-invalid={Boolean(error)}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

type SelectFieldProps = {
  id: keyof FormValues;
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  options: readonly string[];
  onChange: (value: string) => void;
};

function SelectField({
  id,
  label,
  value,
  error,
  placeholder,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="h-11 w-full bg-white"
          aria-invalid={Boolean(error)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
