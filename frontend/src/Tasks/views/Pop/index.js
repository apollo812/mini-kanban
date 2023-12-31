import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import Icon from "Components/Icon";
import React, { useEffect, useRef, useState } from "react";

function Pop({ addEmptyTask, updateSortList, removeStage, id, pos }) {

  const [open, setOpen] = useState(false)

  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Popover placement="bottom-start" open={open}>
      <PopoverHandler>
        <div></div>
      </PopoverHandler>
      <button onClick={() => {setOpen(true);}}><Icon type="dot" width="18" height="8" className="text-kanban_txt mt-1" /></button>
      <PopoverContent>
        <div className=" bg-kanban_bg-edit text-kanban_txt px-3 w-72 rounded-lg" ref={popoverRef}>
          <div className="relative text-center py-3">
            <p className="font-bold">List Actions</p>
            <div className="cursor-pointer" onClick={() => setOpen(false)}>
              <Icon type="remove" height="12" width="12" className="absolute top-[15px] right-[10px]" />
            </div>
          </div>
          <hr className="opacity-10" />
          
          <div className="py-2 cursor-pointer" onClick={() => {addEmptyTask(id); setOpen(false)}}>
            Add card...
          </div>
          <hr className="opacity-10" />

          <div className="py-2 cursor-pointer" onClick={() => {updateSortList(id, pos, "newest"); setOpen(false)}}>
            Sort list (newest first)
          </div>
          <div className="py-2 cursor-pointer" onClick={() => {updateSortList(id, pos, "oldest"); setOpen(false)}}>
            Sort list (oldest first)
          </div>
          <div className="py-2 cursor-pointer" onClick={() => {updateSortList(id, pos, "update"); setOpen(false)}}>
            Sort list (update)
          </div>
          <div className="py-2 cursor-pointer" onClick={() => {updateSortList(id, pos, "alpha"); setOpen(false)}}>
            Sort list (alphabetically)
          </div>
          <hr className="opacity-10" />

          <div className="py-2 cursor-pointer" onClick={() => {removeStage({id, pos}); setOpen(false)}}>
            Remove list...
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Pop;
