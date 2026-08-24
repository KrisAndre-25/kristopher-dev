import { useId, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock, Send } from "lucide-react";
import { WordLoader } from "@/components/ui/word-loader";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";
import { useLanguage } from "@/hooks/useLanguage";
import "./contact-form-demo.css";

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

  const captchaLabelText = `${t.contacto.form.captchaLabel} ${a} + ${b}?`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="cfg-wrapper"
    >
      <form onSubmit={handleSubmit} noValidate className="cfg-card">
        <div className="cfg-header">
          <div className="cfg-title">
            <Lock aria-hidden="true" />
            <span>{t.contacto.form.heading}</span>
          </div>
          <div className="cfg-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="cfg-body">
          <p className="cfg-subheading">{t.contacto.form.subheading}</p>

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

          <div className="cfg-group">
            <input
              id={nameId}
              ref={nameRef}
              type="text"
              required
              aria-required="true"
              autoComplete="name"
              placeholder=" "
            />
            <label htmlFor={nameId} className="cfg-label" data-text={t.contacto.form.name}>
              {t.contacto.form.name}
            </label>
          </div>

          <div className="cfg-group">
            <input
              id={emailId}
              ref={emailRef}
              type="email"
              required
              aria-required="true"
              autoComplete="email"
              placeholder=" "
            />
            <label htmlFor={emailId} className="cfg-label" data-text={t.contacto.form.email}>
              {t.contacto.form.email}
            </label>
          </div>

          <div className="cfg-group">
            <textarea
              id={messageId}
              ref={messageRef}
              required
              aria-required="true"
              rows={3}
              placeholder=" "
            />
            <label htmlFor={messageId} className="cfg-label" data-text={t.contacto.form.message}>
              {t.contacto.form.message}
            </label>
          </div>

          <div className="cfg-group cfg-group--captcha">
            <label htmlFor={captchaId} className="cfg-static-label">
              {captchaLabelText}
            </label>
            <input
              id={captchaId}
              ref={captchaRef}
              type="number"
              required
              aria-required="true"
              aria-describedby={statusId}
              inputMode="numeric"
              className="cfg-captcha-input"
            />
          </div>

          <div
            id={statusId}
            role="status"
            aria-live="polite"
            className={
              "cfg-status" +
              (status === "sent" ? " cfg-status--sent" : status === "error" ? " cfg-status--error" : "")
            }
          >
            {status === "sending" && (
              <WordLoader prefix={t.contacto.form.sendingPrefix} words={t.contacto.form.sendingWords} />
            )}
            {status === "sent" && t.contacto.form.success}
            {status === "error" && errorMsg}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            data-text={t.contacto.form.submit}
            className="cfg-submit"
          >
            <span className="cfg-submit-text">
              <Send aria-hidden="true" className="h-4 w-4" /> {t.contacto.form.submit}
            </span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
