import React from "react";

const KopSurat = () => {
  return (
    <div className="flex items-center border-b-[2.5px] border-black pb-[0.3cm] mb-[0.7cm]">
      {/* Logo */}
      <div className="flex-shrink-0 mr-[0.8cm]">
        <img
          src="/assets/images/logo-uinjkt.png"
          alt="Logo UIN"
          className="w-[2cm] h-[2cm] object-contain"
        />
      </div>

      {/* Teks */}
      <div className="w-full text-center leading-tight">
        <h1 className="text-[11pt] font-bold uppercase">
          Kementerian Agama Republik Indonesia
        </h1>
        <h2 className="text-[9.5pt] font-bold uppercase">
          Universitas Islam Negeri
        </h2>
        <h2 className="text-[9.5pt] font-bold uppercase">
          Syarif Hidayatullah Jakarta
        </h2>
        <p className="text-[7.5pt] mt-1">
          Jalan Ir. H. Juanda Nomor 95 Ciputat 15412 Indonesia
        </p>
        <p className="text-[7.5pt]">
          Telepon (62-21) 7401925; Website:{" "}
          <span className="italic">www.uinjkt.ac.id</span>; E-mail:{" "}
          <span className="italic">tu.umum@apps.uinjkt.ac.id</span>
        </p>
      </div>
    </div>
  );
};

export default KopSurat;
