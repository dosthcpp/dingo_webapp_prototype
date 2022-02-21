import AgreementManagement from "./contents/AgreementManagement";
import DashBoard from "./contents/DashBoard";
import AgreementBoard from "./contents/AgreementBoard";
import NoticeBoard from "./contents/NoticeBoard";
import StudyMaterialBoard from "./contents/StudyMaterialBoard";
import EtcBoard from "./contents/EtcBoard";
import NoticeManagement from "./contents/NoticeManagement";
import Attendance from "./pages/Attendance";
import UploadAlbum from "./pages/UploadAlbum";
import DailyManagement from "./contents/DailyManagement";
import MealPlanManagement from "./contents/MealPlanManagement";
import MyPage from "./contents/MyPage";

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
    case 5:
      return <UploadAlbum />;
    case 6:
      return <AgreementBoard />;
    case 7:
      return <NoticeBoard />;
    case 8:
      return <StudyMaterialBoard />;
    case 9:
      return <EtcBoard />;
    case 10:
      return <DailyManagement />;
    case 11:
      return <MealPlanManagement />;
    case 12:
      return <MyPage />;
    default:
      return null;
  }
};
