import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Task5 } from '../wrappers/Task5';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task5', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task5');
    });

    let blockchain: Blockchain;
    let task5: SandboxContract<Task5>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task5 = blockchain.openContract(Task5.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task5.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task5.address,
            deploy: true,
            success: true,
        });
    });

    it('should give [0]', async () => {
        let result = await task5.getFibonacciSequence(BigInt(0), BigInt(1));
        console.log(result.readTuple());
        // let result = await blockchain.runGetMethod(task5.address, 'fibonacci_sequence', [
        //     {type: 'int', value: BigInt(4)},
        //     {type: 'int', value: BigInt(2)}
        // ]);
        // console.log(result.stackReader.readTuple());
    });

    it('should give [0, 1, 1]', async () => {
        let result = await task5.getFibonacciSequence(BigInt(0), BigInt(3));
        console.log(result.readTuple());1
    });

    it('should give [1, 1, 2]', async () => {
        let result = await task5.getFibonacciSequence(BigInt(1), BigInt(3));
        console.log(result.readTuple());
    });

    it('should give [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]', async () => {
        let result = await task5.getFibonacciSequence(BigInt(0), BigInt(10));
        console.log(result.readTuple());
    });

    it('should give good enough stuff', async () => {
        let result = await task5.getFibonacciSequence(BigInt(10), BigInt(4));
        console.log(result.readTuple());
    });

    it('should give ridiciulous stuff', async () => {
        let result = await task5.getFibonacciSequence(BigInt(201), BigInt(4));
        console.log(result.readTuple());
    });

    it('should give crazy stuff', async () => {
        let result = await task5.getFibonacciSequence(BigInt(370), BigInt(1));
        console.log(result.readTuple());
    });
});
