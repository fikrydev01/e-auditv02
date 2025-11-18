import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import KKonsultasiList from "../pages/private/ketua/KonsultasiList";
import KLaporList from "../pages/private/ketua/LaporList";
import KRevdokList from "../pages/private/ketua/RevdokList";
import KMenRis from "../pages/private/ketua/MenRis";
import KMonKeu from "../pages/private/ketua/MonKeu";
import KMonSdm from "../pages/private/ketua/MonSdm";

import Register from "../pages/auth/RegisterPage";
import RegisterSuccess from "../pages/auth/RegisterSuccess";
import SKonslapReview from "../pages/private/spi/KonslapReview";
import PrintSurtug from "../pages/validasi/PrintSurtug";
import SRevDok from "../pages/private/spi/RevDok";
import SPengawasan from "../pages/private/spi/Pengawasan";
import UKonsultasiList from "../pages/private/user/KonsultasiList";
import AAudit from "../pages/private/admin/Audit";
import SAudit from "../pages/private/spi/Audit";
import KAuditAo from "../pages/private/ketua/AuditAo";
import KAuditBarjas from "../pages/private/ketua/AuditBarjas";
import PrPrintRevdok from "../pages/validasi/PrintRevdok";
import SDumasReview from "../pages/private/spi/DumasReview";
import PrintKonsultasi from "../pages/validasi/PrintKonsultasi";
import UserProfile from "../pages/private/UserProfile";
import NotFoundPage from "../components/NotFoundPage";
import KAuditPdtt from "../pages/private/ketua/AuditPdtt";
import PrPrintLaporanAudit from "../pages/validasi/PrintLaporanAudit";


// Public
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const PrivateLayout = lazy(() => import("../layout/PrivateLayout"));
const HomePage = lazy(() => import("../pages/public/HomePage"));
const TentangPage = lazy(() => import("../pages/public/TentangPage"));

// Admin
const AKonsultasi = lazy(() => import("../pages/private/admin/Konsultasi"));
const AUsers = lazy(() => import("../pages/private/admin/Users"));
const ALaporan = lazy(() => import("../pages/private/admin/Laporan"));
const AManRisk = lazy(() => import("../pages/private/admin/ManRisk"));
const AManoak = lazy(() => import("../pages/private/admin/Manoak"));
const AMonSdm = lazy(() => import("../pages/private/admin/MonSdm"));
const APengawasan = lazy(() => import("../pages/private/admin/Pengawasan"));
const ARevDok = lazy(() => import("../pages/private/admin/RevDok"));
const AMonKeu = lazy(() => import("../pages/private/admin/MonKeu"));

// User
const UAktifitas = lazy(() => import("../pages/private/user/Aktifitas"));
const UListAktifitas = lazy(() =>
  import("../pages/private/user/aktifitas/ListAktifitas")
);
const ULaporList = lazy(() => import("../pages/private/user/LaporList"));
const ULaporAdd = lazy(() => import("../pages/private/user/LaporAdd"));
const UInputSuccess = lazy(() => import("../pages/private/user/InputSuccess"));
const UKonsultasiAdd = lazy(() => import("../pages/private/user/KonsultasiAdd"));
const URevdokAdd = lazy(() => import("../pages/private/user/RevdokAdd"));
const URevdokList = lazy(() => import("../pages/private/user/RevdokList"));
const UWiki = lazy(() => import("../pages/private/user/Wiki"));
const USurvei = lazy(() => import("../pages/private/user/Survei"));

const RoutePath = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          </div>
        }
      >
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/register/success" element={<RegisterSuccess />} />
          <Route path="/val/surat/surtug" element={<PrintSurtug />} />
          <Route path="/val/surat/konsultasi" element={<PrintKonsultasi />} />
          <Route path="/val/surat/revdok" element={<PrPrintRevdok />} />
          <Route path="/print/laporan/audit" element={<PrPrintLaporanAudit />} />

          {/* Dashboard umum */}
          <Route element={<PrivateLayout />}>
            <Route path="/u/d" element={<Dashboard />} />
            <Route path="/u/profil" element={<UserProfile />} />
          </Route>

          {/* Admin */}
          <Route element={<PrivateLayout role="admin" />}>
            <Route path="/a/kons" element={<AKonsultasi />} />
            <Route path="/a/users" element={<AUsers />} />
            <Route path="/a/lap" element={<ALaporan />} />
            <Route path="/a/mr" element={<AManRisk />} />
            <Route path="/a/peng" element={<APengawasan />} />
            <Route path="/a/revdok" element={<ARevDok />} />
            <Route path="/a/audit" element={<AAudit />} />
            <Route path="/a/menoak" element={<AManoak />} />
            <Route path="/a/mkeu" element={<AMonKeu />} />
            <Route path="/a/msdm" element={<AMonSdm />} />
          </Route>
          <Route element={<PrivateLayout role="ketua" />}>
            <Route path="/k/kons" element={<KKonsultasiList />} />
            <Route path="/k/lap" element={<KLaporList />} />
            <Route path="/k/revdok" element={<KRevdokList />} />
            <Route path="/k/mr" element={<AManRisk />} />
            <Route path="/k/mkeu" element={<KMonKeu />} />
            <Route path="/k/msdm" element={<AMonSdm />} />
            <Route path="/k/menoak" element={<AManoak />} />
            <Route path="/k/auditao" element={<KAuditAo />} />
            <Route path="/k/auditbarjas" element={<KAuditBarjas />} />
            <Route path="/k/auditpdtt" element={<KAuditPdtt />} />

          </Route>
          <Route element={<PrivateLayout role="spi" />}>
            <Route path="/s/konsrev" element={<SKonslapReview />} />
            <Route path="/s/dumas" element={<SDumasReview />} />
            <Route path="/s/revdok" element={<SRevDok />} />
            <Route path="/s/msdm" element={<AMonSdm />} />
            <Route path="/s/menoak" element={<AManoak />} />
            <Route path="/s/audit" element={<SAudit />} />
            <Route path="/s/mr" element={<AManRisk />} />
            <Route path="/s/mkeu" element={<KMonKeu />} />
            <Route path="/s/pengawasan" element={<SPengawasan />} />
          
          </Route>

          {/* User */}
          <Route element={<PrivateLayout role="user" />}>
            {/* <Route path="/u/act" element={<UAktifitas />} /> */}
            <Route path="/u/act/list" element={<UListAktifitas />} />
            <Route path="/u/act/lap/list" element={<ULaporList />} />
            <Route path="/u/act/lap/add" element={<ULaporAdd />} />
            <Route path="/u/act/kons/list" element={<UKonsultasiList />} />
            <Route path="/u/act/kons/add" element={<UKonsultasiAdd />} />
            <Route path="/u/act/revdok/list" element={<URevdokList />} />
            <Route path="/u/act/revdok/add" element={<URevdokAdd />} />
            <Route path="/u/wiki" element={<UWiki />} />
            <Route path="/u/survei" element={<USurvei />} />
            <Route path="/u/input_success" element={<UInputSuccess />} />
          </Route>
              <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

    </Router>
  );
};

export default RoutePath;
