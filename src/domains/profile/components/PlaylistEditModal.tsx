// "use client";
// import { useState, useEffect } from "react";

// interface PlaylistEditModalProps {
//   open: boolean;
//   initialName: string;
//   initialDesc: string;
//   onClose: () => void;
//   onSave: (newName: string, newDesc: string) => void;
// }

// const PlaylistEditModal = ({
//   open,
//   initialName,
//   initialDesc,
//   onClose,
//   onSave,
// }: PlaylistEditModalProps) => {
//   const [name, setName] = useState(initialName);
//   const [desc, setDesc] = useState(initialDesc);

//   useEffect(() => {
//     setName(initialName);
//     setDesc(initialDesc);
//   }, [initialName, initialDesc, open]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//       <div className="bg-white p-6 rounded-xl shadow-xl min-w-[320px]">
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-semibold">제목</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border px-2 py-1 rounded"
//             maxLength={50}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-semibold">설명</label>
//           <textarea
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//             className="w-full border px-2 py-1 rounded min-h-[48px]"
//             maxLength={150}
//           />
//         </div>
//         <div className="flex gap-2 justify-end mt-4">
//           <button className="px-3 py-1 rounded border" onClick={onClose}>
//             취소
//           </button>
//           <button
//             className="px-3 py-1 rounded bg-blue-500 text-white"
//             onClick={() => onSave(name.trim(), desc.trim())}
//           >
//             저장
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaylistEditModal;
