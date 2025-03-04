import React, { useState } from "react";
import ModalWindow from "./ModalWindow";

export default function ModalApp() {
  const [open, setOpen] = useState(false);

  return (
    <main className="ModalApp">
      <button onClick={() => setOpen(true)}>
      <i className="ti ti-help-hexagon-filled text-2xl"></i>
      </button>
      <ModalWindow open={open} onClose={() => setOpen(false)}>
        <div className="bg-swamp-3 p-4 rounded-lg shadow-lg w-80 sm:w-96">
          <h2 className="text-2xl font-bold mb-2">Understanding Hexadecimal colors.</h2>
          <p className="mb-2">
            Used in web design, represented by a six-digit code. The code comprises three pairs of digits (00-FF) corresponding to the red, green, and blue (RGB) components.
          </p>
          <ol className="list-disc ml-4">
            <li className="mb-2">
              <strong>Component values: </strong>
              <ol className="list-disc ml-4">
                <li className="mb-1">
                  <strong>00: </strong>
                  No intensity
                </li>
                <li className="mb-1">
                  <strong>FF: </strong>
                  Full intensity
                </li>
                <li className="mb-1">
                  <strong>Example: </strong>
                  #FFFFFF (white), #000000 (black)
                </li>
              </ol>
            </li>

            <li className="mb-2">
              <strong>Digit pairs: </strong>
              <ol className="list-disc ml-4">
                <li className="mb-1">
                  <strong>First pair: </strong>
                  <strong className="text-[#FF0000]">Red</strong>
                </li>
                <li className="mb-1">
                  <strong>Second pair: </strong>
                  <strong className="text-[#00FF10]">Green</strong>
                </li>
                <li className="mb-1">
                  <strong>Third pair: </strong>
                  <strong className="text-[#0000FF]">Blue</strong>
                </li>
                <li className="mb-1">
                  <strong>Example: </strong> <br></br>
                  <div className="bg-swamp-1 p-2 rounded-md">
                    <span className="text-[#F00]">#FF0000 (red)</span> <br></br>
                    <span className="text-[#0F0]">#00FF00 (green)</span> <br></br>
                    <span className="text-[#00F]">#0000FF (blue)</span>
                  </div>
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </ModalWindow>
    </main>
  );
}
