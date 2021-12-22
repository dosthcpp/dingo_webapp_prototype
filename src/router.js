import AgreementManagement from "./contents/AgreementManagement";
import DashBoard from "./contents/DashBoard";
import AgreementBoard from "./contents/AgreementBoard";
import NoticeBoard from "./contents/NoticeBoard";
import StudyMaterialBoard from "./contents/StudyMaterialBoard";
import EtcBoard from "./contents/EtcBoard";
import NoticeManagement from "./contents/NoticeManagement";
import Chat from "./pages/Chat";
import Attendance from "./pages/Attendance";

export const router = (navNo) => {
  switch (navNo) {
    case 0:
      return <DashBoard />;
    case 1:
      return <Attendance />;
    case 2:
      return <AgreementManagement />;
    case 3:
      return <NoticeManagement />;
    case 4:
      return <Chat />;
    case 5:
      return <AgreementBoard />;
    case 6:
      return <NoticeBoard />;
    case 7:
      return <StudyMaterialBoard />;
    case 8:
      return <EtcBoard />;
    default:
      return null;
  }
};
