import{a as p,u as f,b as w,r as v,j as t,m as l,q as b,d as y,e as j,w as N,g as A}from"./index-15ab2af5.js";import{u as S,a as m}from"./index-b874d29c.js";function C(){const{handleAddToCart:d}=p(),{currentUser:c}=f(),g=w(),x=()=>{g("/authentication",{replace:!0})},h=async()=>{if(c)try{const n=b(y(j,"Products"),N("Name","==","WindzStation")),i=await A(n);i.forEach(e=>{console.log(e.id,"=>",e.data());const r={id:e.id,...e.data()};console.log("data from hompage: ",r),console.log("data from homepage: doc name",r.Name),d(r)}),window.alert("Item added to cart"),console.log("querySnapshot ",i)}catch(n){console.log("error ",n)}else window.alert("Please login to add to cart"),x()},{ref:u,inView:a}=S({threshold:.3}),o=m(),s=m();return v.useEffect(()=>{a&&(o.start({x:0,transition:{type:"spring",duration:1,bounce:.3}}),s.start({x:0,transition:{type:"spring",duration:1,duration:1,bounce:.3}})),a||(o.start({x:"-100vw"}),s.start({x:"100vw"}))},[a]),t.jsxs("div",{ref:u,className:"bg-mywhite text-myblack h-screen mx-auto justify-center items-center lg:p-12 md:p-10 flex flex-col md:flex-row lg:gap-12 sm:gap-0 md:gap-6 md:flex",children:[t.jsxs(l.div,{animate:o,className:"flex flex-col text-center sm:pt-10 sm:px-8 md:text-left lg:w-2/5 md:w-3/5 mx-auto md:mx-8 lg:mx-14 gap-4 text-myblack",children:[t.jsx("h1",{className:"font-montserrat font-bold lg:text-4xl md:text-2xl sm:text-xl",children:"WindzStation"}),t.jsx("p",{className:"font-montserrat lg:text-xl md:text-lg sm:text-base font-normal",children:"With New Immersive Experience."}),t.jsx("p",{className:"font-montserrat lg:text-xl md:text-lg sm:text-base font-light",children:"Unleash your gaming potential with WindzStation, where gaming dreams take flight with cutting-edge technology and endless adventures."}),t.jsx("div",{children:t.jsx("button",{onClick:()=>h(),className:"w-32 py-2 rounded-3xl bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-600 bg-orange-500 hover:bg-gradient-to-bl transition ease-in-out hover:scale-105 duration-300 hover:shadow-md hover:shadow-orange-500/30 font-semibold",children:"Add To Cart"})})]}),t.jsx("div",{className:"lg:p-16 md:p-12 sm:p-11 sm:pt-4 flex justify-center mx-auto overflow-hidden",children:t.jsx(l.img,{whileHover:{scale:1.2,transition:{type:"spring",duration:.5,bounce:.3}},animate:s,initial:{x:"100vw"},src:"/assets/Images/ps5.webp",alt:"ps5",className:"lg:w-[90%] md:w-[85%] sm:w-[70%] mx-auto"})})]})}export{C as default};