import React from "react";
import { X, Award, ShieldCheck, Printer, Share2, CheckCircle2, Download } from "lucide-react";
import { CertificateData } from "../types";

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div 
        id="certificate-modal-container" 
        className="bg-[#0b1120] border border-amber-500/40 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 text-xs print:hidden">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Award className="w-4 h-4" />
            <span>Verified Institutional Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition font-medium cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div id="printable-certificate" className="p-8 sm:p-12 relative bg-gradient-to-b from-[#0a0f1d] via-[#0d1527] to-[#0a0f1d] text-slate-100 flex flex-col items-center text-center select-none border-8 border-double border-amber-500/30 m-4 rounded-2xl">
          {/* Subtle Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Award className="w-96 h-96 text-amber-400" />
          </div>

          {/* Academy Header */}
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-extrabold tracking-widest text-xs uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Linguatech Trading Academy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 uppercase tracking-wider font-serif">
              Certificate of Achievement
            </h1>
            <p className="text-xs text-slate-400 tracking-wider uppercase mt-1">
              Institutional Foreign Exchange Competence & Execution
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent my-3"></div>

          {/* Body Statement */}
          <p className="text-xs sm:text-sm text-slate-300 italic mb-2">This is to certify that</p>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide border-b-2 border-amber-500/50 pb-2 px-8 mb-4 font-serif">
            {certificate.studentName}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-2 leading-relaxed">
            has successfully completed all rigorous curriculum modules, practical market case studies, and achieved a certified score of{" "}
            <strong className="text-emerald-400 font-bold">{certificate.score}% ({certificate.grade})</strong> in
          </p>

          <div className="text-lg sm:text-xl font-bold text-amber-300 tracking-wide mb-6">
            "{certificate.courseTitle}"
          </div>

          {/* Verification Badge & Signatures */}
          <div className="w-full grid grid-cols-3 items-end pt-6 border-t border-slate-800/80 gap-4">
            {/* Instructor Signature */}
            <div className="text-left">
              <div className="font-serif italic text-amber-200 text-lg font-bold border-b border-slate-700 pb-1 mb-1">
                {certificate.instructorName}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Lead Curriculum Mentor</div>
              <div className="text-[9px] text-slate-500">Linguatech Trading Desk</div>
            </div>

            {/* Official Gold Seal */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400/80 bg-amber-500/10 flex items-center justify-center p-2 shadow-lg shadow-amber-500/10 mb-1">
                <div className="w-full h-full rounded-full border border-amber-400/40 flex flex-col items-center justify-center text-amber-400">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="text-[8px] font-bold tracking-tighter uppercase">VERIFIED</span>
                </div>
              </div>
              <span className="text-[9px] text-amber-400/80 font-mono font-semibold">SEAL OF EXCELLENCE</span>
            </div>

            {/* Verification Metadata */}
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-slate-200 pb-1 mb-1 border-b border-slate-700">
                {certificate.issuedAt}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Date of Issuance</div>
              <div className="text-[9px] text-slate-500 font-mono break-all truncate">
                ID: {certificate.certificateId}
              </div>
            </div>
          </div>

          {/* Authenticity Hash footer */}
          <div className="mt-6 text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>Cryptographic Verification Hash: {certificate.verificationHash}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
