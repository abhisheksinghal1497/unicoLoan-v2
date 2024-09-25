import { screens } from "./screens";

export const routes = [
    {
      name: screens.Splash,
      component: () => import('../screens/Splash'),
      options: {},
    },
    {
      name: screens.NoInternet,
      component: () => import('../screens/NoInternet'),
      options: {},
    },
    {
      name: screens.ErrorScreen,
      component: () => import('../screens/ErrorScreen'),
      options: {},
    },
    {
      name: screens.HomeScreen,
      component: () => import('../screens/HomeScreen'),
      options: { title: 'Home' },
    },
    {
      name: screens.MyTickets,
      component: () => import('../screens/MyTickets'),
      options: {},
    },
    {
      name: screens.KYC,
      component: () => import('../screens/KYC'),
      options: {},
    },
    {
      name: screens.CaptureAdhaar,
      component: () => import('../screens/CaptureAdhaar'),
      options: {},
    },
    {
      name: screens.CaptureSelfie,
      component: () => import('../screens/CaptureSelfie'),
      options: {},
    },
    {
      name: screens.CongratulationScreen,
      component: () => import('../screens/Congratulation'),
      options: {},
    },
    {
      name: screens.Eligibility,
      component: () => import('../screens/Eligibility'),
      options: {},
    },
    {
      name: screens.ProfileImageScreen,
      component: () => import('../screens/ProfileImage'),
      options: { headerShown: true },
    },
    {
      name: screens.KYCDocuments,
      component: () => import('../screens/KYCDocuments'),
      options: {},
    },
    {
      name: screens.ApplicantDetails,
      component: () => import('../screens/ApplicationDetails'),
      options: {},
    },
    {
      name: screens.PanDetails,
      component: () => import('../screens/PanDetails'),
      options: {},
    },
    {
      name: screens.Sanction,
      component: () => import('../screens/Sanction'),
      options: {},
    },
    {
      name: screens.LoanDetails,
      component: () => import('../screens/LoanDetails'),
      options: {},
    },
    {
      name: screens.FAQ,
      component: () => import('../screens/FAQ'),
      options: {},
    },
    {
      name: screens.CreateTicket,
      component: () => import('../screens/CreateTicket'),
      options: {},
    },
    {
      name: screens.RaiseTicket,
      component: () => import('../screens/RaiseTicket'),
      options: {},
    },
    {
      name: screens.TrackTicket,
      component: () => import('../screens/TrackTicket/index'),
      options: {},
    },
    {
      name: screens.EmiCalculator,
      component: () => import('../screens/EmiCalculator'),
      options: {},
    },
    {
      name: screens.ConsentScreen,
      component: () => import('../screens/ConsentScreen'),
      options: {},
    },
    {
      name: screens.CurrentAddress,
      component: () => import('../screens/CurrentAddress'),
      options: {},
    },
    {
      name: screens.OtpScreen,
      component: () => import('../screens/OtpEnter'),
      options: {},
    },
    {
      name: screens.PinCodeVerify,
      component: () => import('../screens/PinCode'),
      options: {},
    },
    {
      name: screens.PayNow,
      component: () => import('../screens/PayNow'),
      options: { headerShown: true },
    },
    {
      name: screens.StatusCheck,
      component: () => import('../screens/StatusCheck'),
      options: { headerShown: false },
    },
    {
      name: screens.Profile,
      component: () => import('../screens/Profile'),
      options: {},
    },
    {
      name: screens.Services,
      component: () => import('../screens/Services'),
      options: {},
    },
    {
      name: screens.ServiceOtp,
      component: () => import('../screens/ServiceOtp'),
      options: {},
    },
    {
      name: screens.LoginComponent,
      component: () => import('../screens/login/LoginComponent'),
      options: {},
    },
    {
      name: screens.CoApplicant,
      component: () => import('../screens/CoApplicant'),
      options: {},
    },
  ];