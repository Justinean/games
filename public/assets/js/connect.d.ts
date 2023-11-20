declare const checkBelowClick: (id: number) => number;
declare const makePlayerMoveConnect: (target: HTMLParagraphElement, player1?: boolean) => Promise<unknown>;
declare const getValidMovesConnect: () => number[];
declare const makeComputerMoveConnect: () => Promise<unknown>;
declare const evaluateGameConnect: () => "CPU wins" | "Player 2 Wins" | "Player wins" | "Player 1 Wins" | "Player 2 wins" | undefined;
declare const connectListener: (e: Event) => Promise<void>;
