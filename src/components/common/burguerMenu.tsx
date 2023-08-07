"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function BurguerMenu() {
  const token = window.localStorage.getItem("token");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathName = usePathname();
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-7 bg-indigo-600"></span>
            <span className="block h-0.5 w-7 bg-indigo-600"></span>
            <span className="block h-0.5 w-7 bg-indigo-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            {" "}
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul
              className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] overflow-hidden"
              onClick={() => setIsNavOpen(false)}
            >
              {!token ? (
                <>
                  <Link
                    href={
                      pathName !== "/profile/login" ? "/profile/login" : "/"
                    }
                    className="border-b border-indigo-400 my-8 uppercase font-Roboto text-indigo-600"
                  >
                    {pathName !== "/profile/login" ? "Iniciar sesión" : "Home"}
                  </Link>
                  <Link
                    href={
                      pathName !== "/profile/register"
                        ? "/profile/register"
                        : "/"
                    }
                    className="border-b border-indigo-400 my-8 uppercase font-Roboto text-indigo-600"
                  >
                    {pathName !== "/profile/register" ? "Registrarse" : "Home"}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={"/app"}
                    className="border-b border-indigo-400 my-8 uppercase font-Roboto text-indigo-600"
                  >
                    App
                  </Link>
                  <Link
                    href={"/profile"}
                    className="border-b border-indigo-400 my-8 uppercase font-Roboto text-indigo-600"
                  >
                    Perfil
                  </Link>
                </>
              )}

              {token ? (
                <button
                  onClick={logout}
                  className="border-b border-indigo-400 my-8 uppercase font-Roboto text-indigo-600"
                >
                  {" "}
                  Cerrar sesión{" "}
                </button>
              ) : null}
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          {!token ? (
            <>
              <Link
                href={pathName !== "/profile/login" ? "/profile/login" : "/"}
                className="font-Roboto text-indigo-600"
              >
                {pathName !== "/profile/login" ? "Iniciar sesión" : "Home"}
              </Link>
              <Link
                href={
                  pathName !== "/profile/register" ? "/profile/register" : "/"
                }
                className="font-Roboto text-indigo-600"
              >
                {pathName !== "/profile/register" ? "Registrarse" : "Home"}
              </Link>
            </>
          ) : (
            <>
              <Link href={"/app"} className="font-Roboto text-indigo-600">
                App
              </Link>
              <Link href={"/profile"} className="font-Roboto text-indigo-600">
                Perfil
              </Link>
            </>
          )}

          {token ? (
            <button onClick={logout} className="font-Roboto text-indigo-600">
              {" "}
              Cerrar sesión{" "}
            </button>
          ) : null}
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </>
  );
}
