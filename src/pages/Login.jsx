//Firebase...
import { auth, provider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

//React...
import { useState } from "react";

//React-router...
import { useNavigate } from "react-router-dom";

//React-icons...
import { FcGoogle } from "react-icons/fc";
import MobileNav from "./Mobile-nav";

//Styles...
import "../styles/Login.scss";

const safeProcessEnv =
  typeof process !== "undefined" && process && process.env ? process.env : {};

const normalizeEnv = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/^['"]|['"]$/g, "");
};

const RECAPTCHA_SITE_KEY =
  normalizeEnv(safeProcessEnv.REACT_APP_RECAPTCHA_SITE_KEY) ||
  "6LeVhb8sAAAAALH4KD8aRV1Q3FXV2m8IsMdyjwFr";
const RECAPTCHA_API_KEY =
  normalizeEnv(safeProcessEnv.REACT_APP_RECAPTCHA_API_KEY) || "";
const RECAPTCHA_PROJECT_ID =
  normalizeEnv(safeProcessEnv.REACT_APP_RECAPTCHA_PROJECT_ID) || "netfillx";
const RECAPTCHA_LOGIN_ACTION = "LOGIN";
const RECAPTCHA_SIGNUP_ACTION = "SIGNUP";
const RECAPTCHA_MIN_SCORE = 0.5;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadRecaptchaEnterpriseScript = async () => {
    if (window.grecaptcha?.enterprise) {
      return;
    }

    const existingScript = document.querySelector(
      'script[data-recaptcha-enterprise="true"]',
    );
    if (existingScript) {
      await new Promise((resolve, reject) => {
        existingScript.addEventListener("load", resolve, { once: true });
        existingScript.addEventListener("error", reject, { once: true });
      });
      return;
    }

    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.dataset.recaptchaEnterprise = "true";
      script.onload = resolve;
      script.onerror = () =>
        reject(new Error("Failed to load reCAPTCHA script."));
      document.head.appendChild(script);
    });
  };

  const runRecaptcha = async (action = RECAPTCHA_LOGIN_ACTION) => {
    await loadRecaptchaEnterpriseScript();

    const captcha = window.grecaptcha?.enterprise;
    if (!captcha) {
      throw new Error("reCAPTCHA did not load. Please refresh and try again.");
    }

    await new Promise((resolve) => {
      captcha.ready(resolve);
    });

    const token = await captcha.execute(RECAPTCHA_SITE_KEY, {
      action,
    });

    if (!token) {
      throw new Error("reCAPTCHA verification failed. Please try again.");
    }

    return token;
  };

  const assessRecaptchaToken = async (
    token,
    expectedAction = RECAPTCHA_LOGIN_ACTION,
  ) => {
    if (!RECAPTCHA_API_KEY) {
      throw new Error("Missing     reCAPTCHA    API key.");
    }

    if (!RECAPTCHA_API_KEY.startsWith("AIza")) {
      throw new Error(
        "REACT_APP_RECAPTCHA_API_KEY is not a Google API key. Use the key that starts with 'AIza' (not the site key that starts with '6L').",
      );
    }

    const endpoint = `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${RECAPTCHA_API_KEY}`;
    const payload = {
      event: {
        token,
        expectedAction,
        siteKey: RECAPTCHA_SITE_KEY,
      },
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create reCAPTCHA assessment.");
    }

    const assessment = await response.json();
    const tokenProperties = assessment?.tokenProperties || {};

    if (!tokenProperties.valid) {
      const invalidReason = tokenProperties.invalidReason || "Unknown reason";
      throw new Error(`reCAPTCHA token invalid: ${invalidReason}`);
    }

    if (tokenProperties.action !== expectedAction) {
      throw new Error("reCAPTCHA action mismatch. Please try again.");
    }

    const score = assessment?.riskAnalysis?.score ?? 0;
    if (score < RECAPTCHA_MIN_SCORE) {
      throw new Error("reCAPTCHA score too low. Please try again.");
    }

    return assessment;
  };

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSigningIn(true);

    try {
      if (!email || !password) {
        throw new Error("Enter both email and password.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      const action =
        authMode === "create"
          ? RECAPTCHA_SIGNUP_ACTION
          : RECAPTCHA_LOGIN_ACTION;

      const token = await runRecaptcha(action);
      await assessRecaptchaToken(token, action);

      if (authMode === "create") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(error?.message || "Email/password sign-in failed.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const signUpWithGoogle = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSigningIn(true);

    try {
      const token = await runRecaptcha();
      await assessRecaptchaToken(token, RECAPTCHA_LOGIN_ACTION);
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.message || "Login failed. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <section className="login-page">
      <MobileNav />
      <article>
        <h1>Hey There</h1>
        <p>Sign in or sign up if you are new to this site.</p>

        <div
          className="auth-mode-toggle"
          role="tablist"
          aria-label="Authentication mode"
        >
          <button
            type="button"
            className={`mode-btn ${authMode === "login" ? "active" : ""}`}
            onClick={() => setAuthMode("login")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`mode-btn ${authMode === "create" ? "active" : ""}`}
            onClick={() => setAuthMode("create")}
          >
            Create Account
          </button>
        </div>

        <form className="email-auth-form" onSubmit={handleEmailPasswordAuth}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete={
              authMode === "create" ? "new-password" : "current-password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="email-auth-btn"
            disabled={isSigningIn}
          >
            {isSigningIn
              ? "Verifying..."
              : authMode === "create"
                ? "Create Account"
                : "Sign In with Email"}
          </button>
        </form>

        <span className="auth-divider">or</span>

        <button
          className="google-auth-btn"
          onClick={signUpWithGoogle}
          disabled={isSigningIn}
        >
          <FcGoogle />
          {isSigningIn ? "Verifying..." : "Sign in with Google"}
        </button>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
      </article>
    </section>
  );
}
