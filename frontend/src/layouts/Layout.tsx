import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface props{
  children :React.ReactNode;
  showHero?: boolean;
  showSearchBar?: boolean;
}

const Layout = ({children ,showHero , showSearchBar}: props) => {
  return(
    <div className="flex flex-col min-h-screen">
        <Header/>
        {showHero && <Hero/> }
        {showSearchBar && <div className=" container flex justify-center items-center"><SearchBar/></div>}
        <div className="container mx-auto py-10 flex-1">
          {children}
        </div>
        <Footer/>

        
    </div>
  )
}

export default Layout;