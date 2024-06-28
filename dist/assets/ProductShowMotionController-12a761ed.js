import{a as f,u as p,b as w,r as v,j as e,m as l,q as b,d as y,e as j,w as N,g as C}from"./index-15ab2af5.js";import{u as A,a as d}from"./index-b874d29c.js";function k(){const{handleAddToCart:c}=f(),{currentUser:m}=p(),g=w(),x=()=>{g("/authentication",{replace:!0})},u=async()=>{if(m)try{const s=b(y(j,"Products"),N("Name","==","WindzStation Move Motion Controller")),i=await C(s);i.forEach(t=>{console.log(t.id,"=>",t.data());const r={id:t.id,...t.data()};console.log("data from hompage: ",r),console.log("data from homepage: doc name",r.Name),c(r)}),window.alert("Item added to cart"),console.log("querySnapshot ",i)}catch(s){console.log("error ",s)}else window.alert("Please login to add to cart"),x()},{ref:h,inView:o}=A({threshold:.3}),a=d(),n=d();return v.useEffect(()=>{o&&(n.start({x:0,transition:{type:"spring",duration:1,bounce:.3}}),a.start({x:0,transition:{type:"spring",duration:1,duration:1,bounce:.3}})),o||(n.start({x:"-100vw"}),a.start({x:"100vw"}))},[o]),e.jsxs("div",{ref:h,className:"bg-myblack h-screen lg:p-12 md:p-10 overflow-hidden items-center flex flex-col lg:gap-12 sm:gap-16 md:gap-6 md:flex-row-reverse ",children:[e.jsxs(l.div,{animate:a,className:"flex text-mywhite flex-col text-center pt-12 md:pt-0 md:text-left w-[80%] md:w-2/5 mx-auto md:mx-14 gap-4",children:[e.jsx("h1",{className:"font-montserrat font-bold lg:text-4xl md:text-2xl sm:text-xl",children:"WindzStation Move motion controller"}),e.jsx("p",{className:"font-montserrat lg:text-xl md:text-lg sm:text-base font-light",children:"Bring your hands into the game world and take full control of your VR experiences, giving an even deeper sense of presence and further enhancing your immersion."}),e.jsx("div",{children:e.jsx("button",{onClick:()=>u(),className:"w-32 py-2 rounded-3xl bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-600 bg-orange-500 hover:bg-gradient-to-bl transition ease-in-out hover:scale-105 duration-300 hover:shadow-md hover:shadow-orange-500/30 font-semibold",children:"Add To Cart"})})]}),e.jsx("div",{className:"md:p-4 flex justify-center mx-auto",children:e.jsx(l.img,{whileHover:{scale:1.2,transition:{type:"spring",duration:.5,bounce:.5}},animate:n,initial:{x:"100vw"},src:"/assets/Images/motionController.webp",alt:"ps5",className:"lg:w-[80%] md:w-[70%] sm:w-[50%]"})})]})}export{k as default};