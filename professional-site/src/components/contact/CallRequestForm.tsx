"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { countries, getCountryByIso, getDefaultCountryIso } from "@/data/countries";
import {
  formatTimezoneLabel,
  getBrowserTimezone,
  getSupportedTimezones,
} from "@/lib/timezone";
import { FormField, contactInputClass } from "@/components/contact/FormField";
import { ThemedPickerInput, ThemedSelect } from "@/components/contact/ThemedControls";
import { CheckCircle2, Phone } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().email("Enter a valid email address"),
  countryIso: z.string().min(1, "Select a country"),
  phoneNumber: z.string().max(30, "Phone number is too long"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  preferredTimezone: z.string().min(1, "Select a timezone"),
  message: z.string().max(1000, "Note is too long").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export function CallRequestForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [timezoneTouched, setTimezoneTouched] = useState(false);
  const timezones = useMemo(() => getSupportedTimezones(), []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      countryIso: getDefaultCountryIso(),
      phoneNumber: "",
      preferredDate: "",
      preferredTime: "",
      preferredTimezone: "",
      message: "",
    },
  });

  const countryField = register("countryIso");

  useEffect(() => {
    setValue("preferredTimezone", getBrowserTimezone());
  }, [setValue]);

  const onCountryChange = (iso: string) => {
    if (!timezoneTouched) {
      const country = getCountryByIso(iso);
      if (country) setValue("preferredTimezone", country.timezone);
    }
  };

  const onSubmit = async (data: FormData) => {
    const country = getCountryByIso(data.countryIso);
    const dialCode = country?.dialCode ?? "";
    const phone = [dialCode, data.phoneNumber.trim()].filter(Boolean).join(" ").trim() || dialCode;

    try {
      const res = await fetch("/api/call-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          countryCode: dialCode,
          phoneNumber: data.phoneNumber,
          phone,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          preferredTimezone: data.preferredTimezone,
          message: data.message?.trim() || undefined,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setTimezoneTouched(false);
        reset({
          name: "",
          email: "",
          countryIso: getDefaultCountryIso(),
          phoneNumber: "",
          preferredDate: "",
          preferredTime: "",
          preferredTimezone: getBrowserTimezone(),
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-success">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <p className="mt-4 text-lg font-semibold">Call request received</p>
        <p className="mt-2 text-sm text-muted">I&apos;ll reach out shortly to confirm a time.</p>
        <button type="button" onClick={() => setStatus("idle")} className="contact-link-btn mt-6">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" error={errors.name?.message} required>
          <input
            {...register("name")}
            className={contactInputClass}
            placeholder="Your name"
            autoComplete="name"
          />
        </FormField>
        <FormField label="Email" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            className={contactInputClass}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </FormField>
      </div>

      <FormField label="Phone" error={errors.countryIso?.message || errors.phoneNumber?.message}>
        <div className="grid grid-cols-[minmax(0,9rem)_1fr] gap-2">
          <ThemedSelect
            {...countryField}
            onChange={(e) => {
              countryField.onChange(e);
              onCountryChange(e.target.value);
            }}
            aria-label="Country code"
          >
            {countries.map((c) => (
              <option key={c.iso2} value={c.iso2}>
                {c.dialCode} · {c.name}
              </option>
            ))}
          </ThemedSelect>
          <input
            {...register("phoneNumber")}
            type="tel"
            className={contactInputClass}
            placeholder="Phone number"
            autoComplete="tel-national"
          />
        </div>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Preferred date" error={errors.preferredDate?.message} required>
          <ThemedPickerInput
            picker="date"
            {...register("preferredDate")}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </FormField>
        <FormField label="Preferred time" error={errors.preferredTime?.message} required>
          <ThemedPickerInput picker="time" {...register("preferredTime")} required />
        </FormField>
      </div>

      <FormField
        label="Timezone"
        error={errors.preferredTimezone?.message}
        required
        hint="Defaults from your country or browser — change if needed."
      >
        <ThemedSelect
          {...register("preferredTimezone", {
            onChange: () => setTimezoneTouched(true),
          })}
          required
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {formatTimezoneLabel(tz)}
            </option>
          ))}
        </ThemedSelect>
      </FormField>

      <FormField label="Note">
        <textarea
          {...register("message")}
          rows={3}
          className={`${contactInputClass} resize-y`}
          placeholder="Anything I should know before the call?"
        />
      </FormField>

      {status === "error" && (
        <p className="contact-error-banner">Please check the form and try again.</p>
      )}

      <button type="submit" disabled={isSubmitting} className="contact-submit-btn contact-submit-btn-outline">
        <Phone size={16} />
        {isSubmitting ? "Submitting…" : "Request a call"}
      </button>
    </form>
  );
}
