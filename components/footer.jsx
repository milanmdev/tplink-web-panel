import Link from "next/link";
import Image from "next/image";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import packageDotJson from "../package.json";

export function FooterModule() {
  return (
    <>
      <footer className="bg-gray-800 body-font text-white">
        <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
          <p className="mt-4 text-md sm:ml-4 sm:pl-4 sm:mt-0">
            v{packageDotJson.version} - &copy; {new Date().getFullYear()}{" "}
            milanmdev
          </p>
          <span className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start text-xl">
            <Link href="https://github.com/milanmdev/tplink-web-panel" passHref>
              <a target="_blank" className="text-gray-300 hover:text-gray-400">
                <span className="sr-only">GitHub</span>
                <FontAwesomeIcon
                  icon={faGithub}
                  className="w-6 h-6"
                  fill="currentColor"
                />
              </a>
            </Link>
          </span>
        </div>
      </footer>
    </>
  );
}
