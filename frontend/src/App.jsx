// src/App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/layout";
import AdminLayout from "./layout/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import OurServices from "./pages/OurServices";
import OurTeam from "./pages/OurTeam";
import TeamSingle from "./components/Sections/OurTeam/TeamSingle";
import SingleProject from "./components/Sections/OurTeam/SingleProject";
import EnterTheRealm from "./pages/EnterTheRealm";
import NineIslandVault from "./pages/NineIslandVault";
import TheRealmPortal from "./pages/TheRealmPortal";
import TheRealmCore from "./pages/TheRealmCore";
import AsclepiaKey from "./pages/AsclepiaKey";
import BoardwalkIsland from "./pages/BoardwalkIsland";
import CommerceCenter from "./pages/CommerceCenter";
import GrandIsland from "./pages/GrandIsland";
import HyperionIsland from "./pages/HyperionIsland";
import LamontVillas from "./pages/LamontVillas";
import MarinaCove from "./pages/MarinaCove";
import NorthUmbria from "./pages/NorthUmbria";
import Subversa from "./pages/Subversa";
import WhiteHorseKey from "./pages/WhiteHorseKey";
import Fanbase from "./pages/Fanbase";
import FanbaseMembers from "./pages/FanbaseMembers";
import News from "./pages/News";
import Shop from "./pages/Shop";
import MetaMaskWalletTutorial from "./pages/MetaMaskWalletTutorial";
import HyperionEventStadium from "./pages/HyperionEventStadium";
import FRACS from "./pages/FRACS";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import WishlistPage from "./pages/WishlistPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import IslandLocations from "./pages/IslandLocations";

// Admin Pages
import Dashboard from "./scenes/Dashboard";
import Orders from "./scenes/orders";
import Users from "./scenes/users";
import VendorRequest from "./scenes/VendorRequest";
import NFTRequest from "./scenes/NftRequest";
import AllNFTsAdmin from "./scenes/allNFTs";

// Moderator Pages
import ModeratorDashboard from "./pages/ModeratorDashboard";

// Auth
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contacts" element={<ContactUs />} />
            <Route path="card-services" element={<OurServices />} />
            <Route path="our-team" element={<OurTeam />} />
            <Route path="our-team/:memberName" element={<TeamSingle />} />
            <Route path="single-project-detail/:projectName" element={<SingleProject />} />
            <Route path="enter-the-realm" element={<EnterTheRealm />} />
            <Route path="9-island-vault" element={<NineIslandVault />} />
            <Route path="the-realm-portal" element={<TheRealmPortal />} />
            <Route path="the-realm-core" element={<TheRealmCore />} />
            <Route path="asclepia-key" element={<AsclepiaKey />} />
            <Route path="boardwalk" element={<BoardwalkIsland />} />
            <Route path="commerce" element={<CommerceCenter />} />
            <Route path="grand-casino" element={<GrandIsland />} />
            <Route path="hyperion-island" element={<HyperionIsland />} />
            <Route path="lamont-villas" element={<LamontVillas />} />
            <Route path="marina-cove" element={<MarinaCove />} />
            <Route path="north-umbria" element={<NorthUmbria />} />
            <Route path="subversa" element={<Subversa />} />
            <Route path="white-horse-key" element={<WhiteHorseKey />} />
            <Route path="fanbase-sponsorship" element={<Fanbase />} />
            <Route path="card-members" element={<FanbaseMembers />} />
            <Route path="news-blox" element={<News />} />
            <Route path="shop" element={<Shop />} />
            <Route path="metamask-wallet-tutorial" element={<MetaMaskWalletTutorial />} />
            <Route path="hyperion-event-stadium" element={<HyperionEventStadium />} />
            <Route path="fracs-collection" element={<FRACS />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="wishlist-page" element={<WishlistPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="island-locations" element={<IslandLocations />} />
          </Route>

          {/* Moderator Routes */}
          <Route
            path="/moderator-dashboard"
            element={
              <ProtectedRoute requiredRole="moderator">
                <ModeratorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
         <Route element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/users" element={<Users />} />
  <Route path="/vendor-request" element={<VendorRequest />} />
  <Route path="/nft-request" element={<NFTRequest />} />
  <Route path="/all-nfts" element={<AllNFTsAdmin />} />
</Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
