import { useId, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, ShieldCheck } from "lucide-react";
import { WordLoader } from "@/components/ui/word-loader";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";
import { useLanguage } from "@/hooks/useLanguage";

function randomInt(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

export function ContactFormDemo() {
  const { profile, mailSubject } = useContent();
  const t = useUiStrings();
  const { language } = useLanguage();

  const [a, setA] = useState(() => randomInt(8));
  const [b, setB] = useState(() => randomInt(8));
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const captchaId = useId();
  const statusId = useId();

  const resetCaptcha = () => {
    setA(randomInt(8));
    setB(randomInt(8));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (honeypotRef.current?.value) {
      setStatus("error");
      setErrorMsg(t.contacto.form.errorHoneypot);
      return;
    }

    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const message = messageRef.current?.value.trim() ?? "";
    const captcha = Number(captchaRef.current?.value);

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg(t.contacto.form.errorRequired);
      return;
    }

    if (captcha !== a + b) {
      setStatus("error");
      setErrorMsg(t.contacto.form.errorCaptcha);
      resetCaptcha();
      if (captchaRef.current) captchaRef.current.value = "";
      captchaRef.current?.focus();
      return;
    }

    setStatus("sending");
    window.setTimeout(() => {
      const nameLabel = language === "en" ? "Name" : "Nombre";
      const emailLabel = language === "en" ? "Email" : "Correo";
      const body = `${nameLabel}: ${name}\n${emailLabel}: ${email}\n\n${message}`;
      const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
        mailSubject,
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      setStatus("sent");
      resetCaptcha();
      if (messageRef.current) messageRef.current.value = "";
      if (captchaRef.current) captchaRef.current.value = "";
    }, 900);
  };

  return (
    <CardContainer containerClassName="w-full max-w-md py-0">
      <CardBody className="w-full">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          noValidate
          className="w-full space-y-4 rounded-2xl border border-white/10 bg-neutral-950 p-6 sm:p-8"
        >
          <CardItem translateZ={30} className="w-full">
            <h3 className="text-lg font-semibold text-white">{t.contacto.form.heading}</h3>
            <p className="mt-1 text-sm text-neutral-500">{t.contacto.form.subheading}</p>
          </CardItem>

          {/* Honeypot: campo invisible para personas, visible para bots */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              margin: -1,
              padding: 0,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            <label htmlFor="website">{language === "en" ? "Website" : "Sitio web"}</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              ref={honeypotRef}
            />
          </div>

          <CardItem translateZ={40} className="w-full space-y-4">
            <div>
              <label htmlFor={nameId} className="text-xs font-medium text-neutral-400">
                {t.contacto.form.name}
              </label>
              <input
                id={nameId}
                ref={nameRef}
                type="text"
                required
                aria-required="true"
                autoComplete="name"
                className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-sky-400"
              />
            </div>

            <div>
              <label htmlFor={emailId} className="text-xs font-medium text-neutral-400">
                {t.contacto.form.email}
              </label>
              <input
                id={emailId}
                ref={emailRef}
                type="email"
                required
                aria-required="true"
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-white/10 bg-neutral-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-sky-400"
              />
            </div>

            <div>
              <label htmlFor={messageId} className="text-xs font-medium text-neutral-400">
                {t.contacto.form.message}
              </label>
              <textarea
                id={messageId}
                ref={messageRef}
                required
                aria-required="true"
                rows={4}
                className="mt-1 w-full resize-none rounded-lg border border-white/10 bg-neutral-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-sky-400"
              />
            </div>

            <div>
              <label
                htmlFor={captchaId}
                className="flex items-center gap-1.5 text-xs font-medium text-neutral-400"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
                {t.contacto.form.captchaLabel} {a} + {b}?
              </label>
              <input
                id={captchaId}
                ref={captchaRef}
                type="number"
                required
                aria-required="true"
                aria-describedby={statusId}
                inputMode="numeric"
                className="mt-1 w-24 rounded-lg border border-white/10 bg-neutral-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-sky-400"
              />
            </div>

            <div id={statusId} role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
              {status === "sending" && (
                <WordLoader prefix={t.contacto.form.sendingPrefix} words={t.contacto.form.sendingWords} />
              )}
              {status === "sent" && <span className="text-emerald-400">{t.contacto.form.success}</span>}
              {status === "error" && <span className="text-rose-400">{errorMsg}</span>}
            </div>
          </CardItem>

          <CardItem translateZ={60} className="w-full">
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <Send className="h-4 w-4" /> {t.contacto.form.submit}
            </button>
          </CardItem>
        </motion.form>
      </CardBody>
    </CardContainer>
  );
}
