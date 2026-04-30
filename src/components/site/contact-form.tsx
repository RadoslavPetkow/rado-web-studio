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
import { trackEvent } from "@/lib/analytics";
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

const fieldLabels: Record<keyof FormValues, string> = {
  fullName: "Full name",
  email: "Email",
  businessName: "Business name",
  businessType: "Business type",
  serviceNeeded: "Service needed",
  budgetRange: "Budget range",
  timeline: "Timeline",
  message: "Message",
};

export function ContactForm({ className }: { className?: string }) {
  const router = useRouter();
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
      `Full name: ${values.fullName}`,
      `Email: ${values.email}`,
      `Business name: ${values.businessName}`,
      `Business type: ${values.businessType}`,
      `Service needed: ${values.serviceNeeded}`,
      `Budget range: ${values.budgetRange}`,
      `Timeline: ${values.timeline}`,
      "",
      "Message:",
      values.message,
    ].join("\n");

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [values]);

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
        nextErrors[field] = `${fieldLabels[field]} is required.`;
      }
    }

    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      setStatus("error");
      setStatusMessage("Please complete the required fields.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    if (!formspreeEndpoint) {
      trackEvent("contact_form_mailto_fallback_used", {
        service: values.serviceNeeded,
        budget: values.budgetRange,
        timeline: values.timeline,
      });
      window.location.href = mailtoHref;
      setStatus("success");
      setStatusMessage(
        "Your email client should open with the request details ready to send. Please send that email to complete the request."
      );
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
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setStatusMessage(
        `Something went wrong. You can email me directly at ${siteConfig.email}.`
      );
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
          label="Full name"
          value={values.fullName}
          error={errors.fullName}
          onChange={(value) => updateField("fullName", value)}
          autoComplete="name"
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(value) => updateField("email", value)}
          autoComplete="email"
        />
        <TextField
          id="businessName"
          label="Business name"
          value={values.businessName}
          error={errors.businessName}
          onChange={(value) => updateField("businessName", value)}
          autoComplete="organization"
        />
        <TextField
          id="businessType"
          label="Business type"
          value={values.businessType}
          error={errors.businessType}
          onChange={(value) => updateField("businessType", value)}
          placeholder="Restaurant, barber shop, coach..."
        />
        <SelectField
          id="serviceNeeded"
          label="Service needed"
          value={values.serviceNeeded}
          error={errors.serviceNeeded}
          placeholder="Choose a service"
          options={siteConfig.formOptions.services}
          onChange={(value) => updateField("serviceNeeded", value)}
        />
        <SelectField
          id="budgetRange"
          label="Budget range"
          value={values.budgetRange}
          error={errors.budgetRange}
          placeholder="Choose a budget"
          options={siteConfig.formOptions.budgets}
          onChange={(value) => updateField("budgetRange", value)}
        />
        <SelectField
          id="timeline"
          label="Timeline"
          value={values.timeline}
          error={errors.timeline}
          placeholder="Choose a timeline"
          options={siteConfig.formOptions.timelines}
          onChange={(value) => updateField("timeline", value)}
        />
      </div>

      <div className="mt-5 grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell me what you want to build, what is not working today, and what a successful first version would do for your business."
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
          Your information is only used to respond to your project request. No
          spam.
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
          Send request
        </Button>
      </div>
    </form>
  );
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
  options: string[];
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
