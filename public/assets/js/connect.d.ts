declare const checkBelowClick: (id: number) => number;
declare const makePlayerMoveConnect: (target: HTMLParagraphElement) => Promise<unknown>;
declare const getValidMovesConnect: () => number[];
declare const makeComputerMoveConnect: () => Promise<unknown>;
declare const evaluateGameConnect: () => "CPU wins" | "Player wins" | undefined;
declare const connectListener: (e: MouseEvent) => Promise<void>;
