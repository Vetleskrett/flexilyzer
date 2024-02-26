import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface BottomContentProps {
  tableLength: number;
  selectedKeys: Selection;
}
const BottomContent = ({ tableLength, selectedKeys }: BottomContentProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${tableLength} selected`}
        </span>
      </div>
      {(selectedKeys === "all" || selectedKeys.size > 0) && (
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" color="primary">
                Action on selected teams
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem startContent={<PictureAsPdfIcon className="h-[18px]" />}>
                Generate Report
              </DropdownItem>
              <DropdownItem
                startContent={
                  <NotificationImportantIcon className="h-[18px]" />
                }
              >
                Send Reminder Email
              </DropdownItem>
              <DropdownItem
                startContent={<RestartAltIcon className="h-[18px]" />}
              >
                Rerun Analyzers
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export { BottomContent };
