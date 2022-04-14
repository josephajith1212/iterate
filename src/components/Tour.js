import React, {useReducer, useEffect, useState} from "react";
import JoyRide, {ACTIONS, EVENTS, STATUS} from "react-joyride";
import {useLocation} from 'react-router-dom'


const TOUR_STEPS1 = [
    {
        target: ".step1",
        content: "\u2728 Hello there ! Welcome To PlanIt \u2728 We are super excited to see you here We know you are new to managing projects and there are tons to learn about this,but dont worry we are here to sort that out for you If you just want to work without any interference,just ignore me now Else let us guide you on what you can do with PlanIT Click here for a guided tour",
        disableBeacon: true,
    },
    {
        target: ".step2",
        content: "This is where all the projects you have created or are a part of show up.",
        disableBeacon: true,
    },
    {
        target: ".step3",
        content: "Now lets take the first step of creating a project! Click On New Project To Go To The Project Creation Page.",
    },
];

let INITIAL_STATE = {
    key: new Date(),
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    showProgress: true,
    steps: TOUR_STEPS1,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "START":
            return {...state, run: true};
        case "RESET":
            return {...state, stepIndex: 0};
        case "STOP":
            return {...state, run: false};
        case "NEXT_OR_PREV":
            return {...state, ...action.payload};
        case "RESTART":
            return {
                ...state,
                stepIndex: 0,
                run: true,
                loading: false,
                key: new Date(),
            };
        default:
            return state;
    }
};

const Tour = () => {
    const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
    // if (useLocation().pathname === '/create') {
    //     INITIAL_STATE.steps = [
    //         {
    //             target: ".step1",
    //             content: "bla bla",
    //             disableBeacon: true,
    //         },
    //         {
    //             target: ".step2",
    //             content: "222",
    //         },
    //     ];
        
    // }

    console.log(useLocation())
    useEffect(() => {
        if (!localStorage.getItem("tour")) {
            dispatch({type: "START"});
        }
    }, []);

    const callback = (data) => {
        const {action, index, type, status} = data;

        if (
            action === ACTIONS.CLOSE ||
            (status === STATUS.SKIPPED && tourState.run) ||
            status === STATUS.FINISHED
        ) {
            dispatch({type: "STOP"});
        } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
            dispatch({
                type: "NEXT_OR_PREV",
                payload: {stepIndex: index + (action === ACTIONS.PREV ? -1 : 1)},
            });
        }
    };

    const startTour = () => {
        dispatch({type: "RESTART"});
    };

    return (
        <>
            <button className="btn btn-primary" onClick={startTour}>
                PlanIT Wizard 🧙
            </button>

            <JoyRide
                {...tourState}
                callback={callback}
                showSkipButton={true}
                styles={{
                    tooltipContainer: {
                        textAlign: "left",
                    },

                    buttonBack: {
                        marginRight: 10,
                    },
                }}
                locale={{
                    last: "End tour",
                }}
            />
        </>
    );
};

export default Tour;