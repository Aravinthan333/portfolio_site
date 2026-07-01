"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { contactServiceOptions } from "@/data/profile";
import { FormField, contactInputClass } from "@/components/contact/FormField";
import { ThemedSelect } from "@/components/contact/ThemedControls";
import { CheckCircle2, Send } from "lucide-react";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().email("Enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .max(2000, "Message must be under 2000 characters")
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          message: data.message?.trim() || undefined,
        }),
      });
      if (res.ok) {
        setStatus("success");
        reset();
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
        <p className="mt-4 text-lg font-semibold">Message sent</p>
        <p className="mt-2 text-sm text-muted">I&apos;ll get back to you within 24 hours.</p>
        <button type="button" onClick={() => setStatus("idle")} className="contact-link-btn mt-6">
          Send another message
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
            placeholder="Aravinthan Balaji"
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

      <FormField label="Service required" error={errors.service?.message} required>
        <ThemedSelect {...register("service")} defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {contactServiceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </ThemedSelect>
      </FormField>

      <FormField
        label="Project details"
        error={errors.message?.message}
        hint="Goals, timeline, budget range, or technical context."
      >
        <textarea
          {...register("message")}
          rows={5}
          className={`${contactInputClass} resize-y min-h-[120px]`}
          placeholder="Tell me what you're building and how I can help…"
        />
      </FormField>

      {status === "error" && (
        <p className="contact-error-banner">Something went wrong. Please try again.</p>
      )}

      <button type="submit" disabled={isSubmitting} className="contact-submit-btn">
        <Send size={16} />
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
