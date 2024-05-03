'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { inject, observer } from "mobx-react";
import { toJS } from 'mobx';

const Payment = inject("appStore")(
	observer(() => {
		return <></>
	}))


export default Payment