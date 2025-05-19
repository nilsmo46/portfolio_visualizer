import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

const PortfolioSaveModal = () => {
  const [open, setOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState('');
  const [visibility, setVisibility] = useState('private');
  
  const handleSave = () => {
    // Implement save functionality
    console.log(`Saving portfolio: ${portfolioName} with visibility: ${visibility}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Portfolio</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Portfolio</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              placeholder="My Custom Portfolio"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="visibility" className="text-right">
              Visibility
            </Label>
            <Select
              value={visibility}
              onValueChange={setVisibility}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="shared">Shared with specific users</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {visibility === "shared" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shares" className="text-right">
                Share with
              </Label>
              <Input
                id="shares"
                placeholder="Enter email addresses"
                className="col-span-3"
              />
            </div>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Optional description"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioSaveModal;