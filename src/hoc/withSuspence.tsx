import React, {Suspense} from 'react';
import {Preloader} from "../components/common/Preloader/Preloader";

    export function withSuspense <WPC>(Component:any){
        return (props: WPC) => {
            return <Suspense fallback={<Preloader/>}><Component {...props}/></Suspense>
        }
    }

