import { getTranslations } from "next-intl/server";
import { getSiteProfile } from "@/lib/site-profile";

export async function Footer() {
  const profile = await getSiteProfile();
  const t = await getTranslations("common");

  return (
    <footer className="site-footer">
      <div className="container-wide py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-xs text-muted sm:text-left sm:text-sm">
            {t("copyright", { year: new Date().getFullYear(), name: profile.name })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold sm:gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {t("github")}
            </a>
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {t("linkedIn")}
            </a>
            <a href={`mailto:${profile.email}`} className="footer-link">
              {t("email")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
