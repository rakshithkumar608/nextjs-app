"use client";


import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";

interface CreateJobApplicationDialougeProps {
    columnId: string;
    boardId: string;
   
}

const INITIAL_FORM_DATA = {
        company: "",
        position: "",
        location:"",
        notes:"",
        salary:"",
        jobUrl:"",
        tags:"",
        description:"",
};

export default function CreateJobApplicationDialouge({
    columnId,
    boardId,
}: CreateJobApplicationDialougeProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();

        try {
            const result = await createJobApplication({
                ...formData,
                columnId,
                boardId,
                tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
            });

            if (result.error) {
                console.error(result.error);
                return;
            }

            setOpen(false);
            setFormData(INITIAL_FORM_DATA);
        } catch (err) {
            console.error(err);
        }
    }
    return (
       <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            <Button 
            className="w-full mb-4 justify-start text-muted-foreground border-dashed border-2 hover:border-solid hover:bg-muted/50"
            variant="ghost">
                <Plus className="mr-2 h-4 w-4"/>
                Add Jobs
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Add Job Application</DialogTitle>
                <DialogDescription>Track a new job applications</DialogDescription>
            </DialogHeader>
            <form 
            onSubmit={handleSubmit}
            className="space-y-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="company">Company *</Label>
                            <Input 
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company:e.target.value})}
                            id="company" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="position">Position *</Label>
                            <Input 
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position:e.target.value})}
                            id="position" required/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location:e.target.value})}
                            id="location" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary</Label>
                            <Input 
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary:e.target.value})}
                            id="salary" placeholder="e.g., $100k - $200k"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="url">Job URL</Label>
                        <Input 
                        value={formData.jobUrl}
                        onChange={(e) =>
                        setFormData({ ...formData, jobUrl: e.target.value })
                            }
                        id="url" placeholder="https://company.com/careers/job-id"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags:e.target.value})}
                        id="tags" placeholder="Rect, Tailwind, High Paid.."/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description:e.target.value})}
                        id="description" placeholder="Brief description of the role..."/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea 
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes:e.target.value})}
                        id="notes" 
                        rows={4}
                        placeholder="Write about your opinion..."/>
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                    onClick={() => setOpen(false)}
                    type="button" variant="outline">Cancel</Button>
                    <Button type="submit">Add Application</Button>
                </DialogFooter>
            </form>
        </DialogContent>
       </Dialog>
    );
}