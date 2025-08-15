import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import OurServices from "./pages/OurServices";
import OurTeam from "./pages/OurTeam";
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
import TeamSingle from "./components/Sections/OurTeam/TeamSingle";
import SingleProject from "./components/Sections/OurTeam/SingleProject";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/contacts" element={<ContactUs />}></Route>
            <Route path="/card-services" element={<OurServices />}></Route>
            <Route path="/our-team" element={<OurTeam />}></Route>
            <Route path="/our-team/:memberName" element={<TeamSingle />} />
            <Route path="/single-project-detail/:projectName" element={<SingleProject/>} />
          
            <Route path="/enter-the-realm" element={<EnterTheRealm />}></Route>
            <Route path="/9-island-vault" element={<NineIslandVault />}></Route>
            <Route
              path="/the-realm-portal"
              element={<TheRealmPortal />}
            ></Route>
            <Route path="/the-realm-core" element={<TheRealmCore />}></Route>
            <Route path="/asclepia-key" element={<AsclepiaKey />}></Route>
            <Route path="/boardwalk" element={<BoardwalkIsland />}></Route>
            <Route path="/commerce" element={<CommerceCenter />}></Route>
            <Route path="/grand-casino" element={<GrandIsland />}></Route>
            <Route path="/hyperion-island" element={<HyperionIsland />}></Route>
            <Route path="/lamont-villas" element={<LamontVillas />}></Route>
            <Route path="/marina-cove" element={<MarinaCove />}></Route>
            <Route path="/north-umbria" element={<NorthUmbria />}></Route>
            <Route path="/subversa" element={<Subversa />}></Route>
            <Route path="/white-horse-key" element={<WhiteHorseKey />}></Route>
            <Route path="/fanbase-sponsorship" element={<Fanbase />}></Route>
            <Route path="/card-members" element={<FanbaseMembers />}></Route>
            <Route path="/news-blox" element={<News />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route
              path="/metamask-wallet-tutorial"
              element={<MetaMaskWalletTutorial />}
            ></Route>
            <Route
              path="/hyperion-event-stadium"
              element={<HyperionEventStadium />}
            ></Route>
            <Route path="/fracs-collection" element={<FRACS />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/edit-profile" element={<EditProfile />}></Route>
            <Route path="/wishlist-page" element={<WishlistPage />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route
              path="/island-locations"
              element={<IslandLocations />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
