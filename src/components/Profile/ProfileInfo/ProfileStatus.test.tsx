import React from "react";
import {create} from 'react-test-renderer'
import {ProfileStatus} from "./ProfileStatus";

describe('Profile status component', () => {
    test('status from props shuld be in state', () => {
        //@ts-ignore
        const component = create(<ProfileStatus status={'it-kamasutra.com'}/>);
        const instance = component.getInstance();
        //@ts-ignore
        expect(instance.state.status).toBe('it-kamasutra.com');
    });
});