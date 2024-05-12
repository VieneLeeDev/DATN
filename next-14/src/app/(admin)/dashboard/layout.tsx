/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import HeaderDashboard from '@/components/HeaderDashboard';
import { MdRoomPreferences } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import type { MenuProps } from 'antd';
import Link from 'next/link';

const { Content, Footer, Sider } = Layout;


const layout = ({ children }: { children: React.ReactNode }) => {

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const items = [{
		key: 1,
		icon: <MdRoomPreferences height={32} width={32} />,
		label: <Link href="/dashboard">Room</Link>
	}, {
		key: 2,
		icon: <RiAccountCircleFill height={32} width={32} />,
		label: <Link href="/dashboard/account">Account</Link>,
	},]

	const handleNavigate: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
	};
	return (
		<Layout className='min-h-screen bg-slate-200'>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="demo-logo-vertical" />
				<Menu onClick={handleNavigate} theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} style={{ fontWeight: 700, fontSize: '16px' }} />
			</Sider>
			<Layout>
				<HeaderDashboard />
				<Content style={{ margin: '24px 16px 0' }}>
					<div
						style={{
							padding: 24,
							height: '100%',
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};
export default layout;
