import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";

export function Header() {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  
  const formattedDate = new Intl.DateTimeFormat('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(currentTime);
  
  const formattedTime = new Intl.DateTimeFormat('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(currentTime);

  return (
    <Navbar 
      className={`bg-background/60 dark backdrop-blur-md border-b border-divider fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <NavbarBrand>
        <div className="flex items-center gap-2">
          <Icon icon="lucide:film" className="text-primary text-2xl" />
          <p className="font-bold text-inherit text-xl">آسيراما</p>
        </div>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <div className="text-default-500 text-sm">
            {formattedDate} | {formattedTime}
          </div>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[18rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="بحث..."
            size="sm"
            startContent={<Icon icon="lucide:search" size={18} />}
            type="search"
          />
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" aria-label="بحث">
            <Icon icon="lucide:search" className="text-xl block lg:hidden" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" aria-label="إشعارات">
            <Icon icon="lucide:bell" className="text-xl" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" aria-label="الإعدادات">
            <Icon icon="lucide:settings" className="text-xl" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button color="primary" variant="flat">
            تسجيل الدخول
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}