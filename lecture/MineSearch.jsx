
import React, { createContext, useReducer, useMemo } from 'react';
import Table from './Table';
import Form from './Form';


export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, //0이상이면 다 oepend
};


export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: false,
};

const plantMine = (row, cell, mine) => {
    // console.log(row, cell, mine);

    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false, // 게임 시작 halted(중단된)
            };
        case OPEN_CELL: { //불변성을 유지해야 된다.

            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            let around = [];
            if (tableData[action.row - 1]) {
                around = around.concat(
                    tableData[action.row - 1][action.cell - 1],
                    tableData[action.row - 1][action.cell],
                    tableData[action.row - 1][action.cell + 1]
                );
            }
            around = around.concat(
                tableData[action.row][action.cell - 1],
                tableData[action.row][action.cell + 1]
            )
            if (tableData[action.row - 1]) {
                around = around.concat(
                    tableData[action.row + 1][action.cell - 1],
                    tableData[action.row + 1][action.cell],
                    tableData[action.row + 1][action.cell + 1]
                )
            }
            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            console.log(around, count);
            tableData[action.row][action.cell] = count;

            return {
                ...state,
                tableData,
            };
        }
        case CLICK_MINE: {

            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;

            return {
                ...state,
                tableData,
                halted: true, // 게임 중단 halted(중단된)
            };
        }
        case FLAG_CELL: {

            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }

            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {

            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }

            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {

            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }

            return {
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state; //코드가 길어지면 구조분해

    const value = useMemo(() => ({ tableData: tableData,halted: halted, dispatch }), [tableData, halted]);
    // usememo로 객체값을 기억해주기(캐싱해주기)

    return (
        <>
            <TableContext.Provider value={value} >
                <Form dispatch={dispatch} />
                <div>{timer}</div>
                <Table />
                <div>{result}</div>
            </TableContext.Provider>
        </>
    );
};

export default MineSearch;