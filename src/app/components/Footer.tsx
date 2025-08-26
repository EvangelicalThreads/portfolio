import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-gray-500 border-t mt-20">
      © {new Date().getFullYear()} Katie Wang. All rights reserved.
    </footer>
  );
}
