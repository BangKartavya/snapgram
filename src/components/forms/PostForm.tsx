import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";
import FileUploader from "@/components/shared/FileUploader.tsx";
import {PostValidation} from "@/lib/validation";
import {Models} from "appwrite";
import {useCreatePost, useUpdatePost} from "@/lib/react-query/queriesAndutations.ts";
import {useUserContext} from "@/context/AuthContext.tsx";
import {useToast} from "@/hooks/use-toast.ts";
import {useNavigate} from "react-router-dom";
import Loader from "@/components/shared/Loader.tsx";

type PostFormProps = {
    post?: Models.Document,
    action: "Create" | "Update"
}

const PostForm = ({post, action}: PostFormProps) => {
    const {mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost();
    const {mutateAsync: updatePost, isPending: isLoadingUpdate} = useUpdatePost();
    // const {mutateAsync: updatePost, isPending: isLoadingUpdate} = useUpdatePost();

    const {user} = useUserContext();
    const {toast} = useToast();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post?.location : "",
            tags: post ? post.tags.join(",") : ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof PostValidation>) => {
        if (post && action === "Update") {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl
            });

            if (!updatedPost) {
                return toast({
                    title: "Update failed, please try again"
                });
            }

            return navigate(`/posts/${post.$id}`);
        }
        const newPost = await createPost({
            ...values,
            userId: user.id
        });

        if (!newPost) {
            return toast({
                title: "Failed to create Post"
            })
        }
        navigate('/');
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl}/>
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field}/>
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Tags (seperated by ",")</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input"
                                       placeholder="Art, Expression, Learn" {...field}/>
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button type="button" className="shad-button_dark_4">Cancel</Button>
                    <Button type="submit" className="shad-button_primary whitespace-nowrap"
                            disabled={isLoadingCreate || isLoadingUpdate}>
                        {isLoadingUpdate || isLoadingCreate ? <Loader/> : (
                            action === "Update" ? "Update" :
                                "Create"
                        )}
                    </Button>

                </div>
            </form>
        </Form>
    );
};

export default PostForm;