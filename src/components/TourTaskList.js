import React, {useReducer, useEffect} from "react";
import JoyRide, {ACTIONS, EVENTS, STATUS} from "react-joyride";


const TOUR_STEPS1 = [
    {
        target: ".TLstep1",
        content: "All your tasks will be displayed here.",
        disableBeacon: true,
    },
    {
        target: ".TLstep2",
        content: "New tasks for this project can be created from here.",
        disableBeacon: true,
    },
    {
        target: ".TLstep3",
        content: "Every new task starts here and can be moved to next ones when needed.",
        disableBeacon: true,
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

const TourTaskList = () => {
    const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

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

export default TourTaskList;