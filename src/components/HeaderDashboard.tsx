'use client'
import { Button, Tooltip } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function HeaderDashboard() {
	const router = useRouter()

	const IconFont = createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
	});

	const handleBackToLandingPage = () => {
		router.push('/')
	}

	return (
		<section className="w-full h-[50px] flex justify-between items-center px-[20px] py-[8px] bg-white" >
			<span className="font-bold text-lg"> Managerment System </span>
			<Tooltip
				title="Trở về trang chủ"
			>
				<Button onClick={handleBackToLandingPage} style={{ border: 'none' }}>
					<IconFont style={{ fontSize: '25px' }} type="icon-tuichu" />
				</Button>
			</Tooltip>
		</section>
	)
}
