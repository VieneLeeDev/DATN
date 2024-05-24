'use client'
import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { Button } from 'antd'
import Tus from '@uppy/tus';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';
const Uploader = () => {
	const [id, setId] = useState("")

	const initPage = async () => {
		const { data, error } = await supabase.from('profiles').select()
		data && setId(data[0].id)

	}

	useEffect(() => {
		initPage()
	}, [])

	const onAfterResponse = async (req: any) => {
		// const { data } = await supabaseUpload.auth.getSession();
		// req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);

	}

	const [uppy] = useState(() => new Uppy({
		restrictions: {
			maxNumberOfFiles: 1,
			allowedFileTypes: ['image/*'],
			maxFileSize: 5 * 1000 * 1000
		}
	}).use(Tus, {
		endpoint: `https://uyqpdlvgnfovkyufnmnr.supabase.co/storage/v1/upload/resumable`,
		onAfterResponse,
		allowedMetaFields: [
			"bucketName",
			"objectName",
			"contentType",
			"cacheControl",
		]
	}));


	uppy.on("file-added", (file) => {
		file.meta = {
			...file.meta,
			bucketName: "avatar",
			contentType: file.type,
		};
	});
	const handleUpload = async () => {
		// uppy.setFileMeta(uppy.getFiles()[0].id, {
		// 	objectName: id + "/" + uppy.getFiles()[0].name
		// })
		// uppy.upload()
		// const supabaseUpload = createClient('https://uyqpdlvgnfovkyufnmnr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cXBkbHZnbmZvdmt5dWZubW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNTkxMzIsImV4cCI6MjAyNTYzNTEzMn0.NlPO4G0Veg7L3DW5MRzHRwlW1pwc7GG-9kVeq_nYtno')
		// const buckets = await supabaseUpload.storage.getB;
		// console.log(buckets);
		alert("Feature is comming soon!")
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button id='upload-trigger'></Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Avatar Upload</DialogTitle>
					<DialogDescription>
						Drop your best photo.
					</DialogDescription>
				</DialogHeader>
				<div>
					<Dashboard uppy={uppy} hideUploadButton />
					<Button onClick={handleUpload} className='w-full font-bold bg-blue-500 h-[32px] mt-5 text-white'>Upload</Button>
				</div>
			</DialogContent>
		</Dialog>

	)
}

export default Uploader