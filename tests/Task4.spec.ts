import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { beginCell, Cell, toNano } from 'ton-core';
import { Task4 } from '../wrappers/Task4';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task4', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task4');
    });

    let blockchain: Blockchain;
    let task4: SandboxContract<Task4>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task4 = blockchain.openContract(Task4.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task4.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task4.address,
            deploy: true,
            success: true,
        });
    });

    it('should encrypt', async () => {
        
        let message = 0x2148656C6C6F;
        let message_size = 6 * 8;

        let result = await task4.getEncrypted(BigInt(4), beginCell().storeUint(0, 32).storeUint(message, message_size).endCell());
        
        let resSlice = result.readCell().beginParse();

        resSlice.loadUint(32);

        console.log("Size: ", resSlice.remainingBits,
                    "\nOriginal: ", message.toString(16),
                    "\nResult  : ", resSlice.loadUint(message_size).toString(16));
    });

    it('should decrypt', async () => {
        
        let message = 0x214C69707073;
        let message_size = 6 * 8;

        let result = await task4.getDecrypted(BigInt(4), beginCell().storeUint(0, 32).storeUint(message, message_size).endCell());
        
        let resSlice = result.readCell().beginParse();

        resSlice.loadUint(32);

        console.log("Size: ", resSlice.remainingBits,
                    "\nOriginal: ", message.toString(16),
                    "\nResult  : ", resSlice.loadUint(message_size).toString(16));
    
    });
});
