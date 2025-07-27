// // import React, { useContext, useState } from 'react';
// // import ChatContainer from '../ChatContainer';
// // import Rightsidebar from '../Rightsidebar';
// // import Sidebar from '../Sidebar';
// // import { ChatContext } from '../../context/ChatContext';
// // function Homepage() {
// //   const{selecteduser}=useContext(ChatContext)
// //   return (
// //     <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
// //       <div className={`backdrop-blur-xl border-2 border-gray--600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selecteduser?`md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]`:`md:grid-cols-2`} `}>
// //         <Sidebar/>
// //       <div className="w-full h-screen">
// //       <ChatContainer />
// //       </div>
// //       <Rightsidebar />
// //     </div>
// //     </div>
// //   ); 
// // }

// // export default Homepage;
// // import React, { useContext } from 'react';
// // import ChatContainer from '../ChatContainer';
// // import Rightsidebar from '../Rightsidebar';
// // import Sidebar from '../Sidebar';
// // import { ChatContext } from '../../context/ChatContext';

// // function Homepage() {
// //   const { selecteduser } = useContext(ChatContext);

// //   return (
// //     <div className='w-full h-screen sm:px-[15%] sm:py-[5%]'>
// //       <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 ${selecteduser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
        
// //         {/* Sidebar */}
// //         <div className="h-full overflow-hidden">
// //           <Sidebar />
// //         </div>

// //         {/* Chat */}
// //         <div className="h-full overflow-hidden">
// //           <ChatContainer />
// //         </div>

// //         {/* Rightsidebar */}
// //         <div className="h-full overflow-hidden">
// //           <Rightsidebar />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Homepage;

// import React, { useContext, useState } from 'react';
// import ChatContainer from '../ChatContainer';
// import Rightsidebar from '../Rightsidebar';
// import Sidebar from '../Sidebar';
// import { ChatContext } from '../../context/ChatContext';

// function Homepage() {
//   const { selecteduser } = useContext(ChatContext);
//   const [showRightSidebar, setShowRightSidebar] = useState(false);

//   const getGridLayout = () => {
//     if (!selecteduser) return 'md:grid-cols-2';
//     return showRightSidebar
//       ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
//       : 'md:grid-cols-[1fr_2fr]';
//   };

//   return (
//     <div className='w-full h-screen sm:px-[15%] sm:py-[5%]'>
//       <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 ${getGridLayout()}`}>
        
//         {/* Sidebar */}
//         <div className="h-full overflow-hidden">
//           <Sidebar />
//         </div>

//         {/* Chat */}
//         <div className="h-full overflow-hidden">
//           <ChatContainer onProfileClick={() => setShowRightSidebar(true)} />
//         </div>

//         {/* Conditional Right Sidebar */}
//         {selecteduser && showRightSidebar && (
//           <div className="h-full overflow-hidden">
//             <Rightsidebar onClose={() => setShowRightSidebar(false)} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Homepage;
// import React, { useContext, useState } from 'react';
// import ChatContainer from '../ChatContainer';
// import Rightsidebar from '../Rightsidebar';
// import Sidebar from '../Sidebar';
// import { ChatContext } from '../../context/ChatContext';

// function Homepage() {
//   const { selecteduser } = useContext(ChatContext);
//   const [showRightSidebar, setShowRightSidebar] = useState(false);

//   const getGridLayout = () => {
//     if (!selecteduser) return 'md:grid-cols-2';
//     return showRightSidebar
//       ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
//       : 'md:grid-cols-[1fr_2fr]';
//   };

//   return (
//     <div className='w-full h-screen sm:px-[15%] sm:py-[5%]'>
//       <div
//         className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 ${getGridLayout()}`}
//       >
//         {/* Sidebar */}
//         <div className={`h-full overflow-hidden ${selecteduser ? 'max-md:hidden' : ''}`}>
//           <Sidebar />
//         </div>

//         {/* Chat */}
//         <div className="h-full overflow-hidden">
//           <ChatContainer onProfileClick={() => setShowRightSidebar(true)} />
//         </div>

//         {/* Conditional Right Sidebar */}
//         {selecteduser && showRightSidebar && (
//           <div className="h-full overflow-hidden">
//             <Rightsidebar onClose={() => setShowRightSidebar(false)} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Homepage;

import React, { useContext, useState } from 'react';
import ChatContainer from '../ChatContainer';
import Rightsidebar from '../Rightsidebar';
import Sidebar from '../Sidebar';
import { ChatContext } from '../../context/ChatContext';

function Homepage() {
  const { selecteduser } = useContext(ChatContext);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const getGridLayout = () => {
    if (!selecteduser) return 'md:grid-cols-2';
    if (showRightSidebar) return 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]';
    return 'md:grid-cols-[1fr_2fr]';
  };

  return (
    <div className='w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 ${getGridLayout()}`}>
        
        {/* Sidebar */}
        <div className={`h-full overflow-hidden ${selecteduser ? 'max-md:hidden' : ''} ${showRightSidebar ? 'hidden md:block' : ''}`}>
          <Sidebar />
        </div>

        {/* Chat Container */}
        <div className={`h-full overflow-hidden ${showRightSidebar ? 'hidden md:block' : ''}`}>
          <ChatContainer onProfileClick={() => setShowRightSidebar(true)} />
        </div>

        {/* Right Sidebar */}
        {selecteduser && showRightSidebar && (
          <div className="h-full overflow-hidden">
            <Rightsidebar onClose={() => setShowRightSidebar(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
