"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DatePicker, Modal, Spin, notification } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from 'next/router';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { inject, observer } from "mobx-react";
import Image from "next/image";
import { useExplorePathname } from "@/hooks";
import { supabase } from "@/utils/supabaseClient";
import { RoomStore } from "@/stores/room.store";
import { toJS } from "mobx";
import Router, { withRouter } from 'next/router'
import PaymentForm from "./components/PaymentForm/PaymentForm";
dayjs.extend(customParseFormat);

const DetailRoom = inject("appStore")(
	observer(({ appStore }: { appStore?: any }) => {

		const [isLoading, setIsloading] = useState(false)
	
		return (
			<Spin spinning={isLoading}>
				<div className="container flex flex-col h-full justify-center items-center lg:py-[30px]">
				</div>
			</Spin>
		);
	})
);

export default function Page() {
	return <DetailRoom />;
}