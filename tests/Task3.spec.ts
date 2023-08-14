import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { beginCell, Cell, toNano, TupleReader } from 'ton-core';
import { Task3 } from '../wrappers/Task3';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task3', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task3');
    });

    let blockchain: Blockchain;
    let task3: SandboxContract<Task3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task3 = blockchain.openContract(Task3.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task3.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task3.address,
            deploy: true,
            success: true,
        });
    });

    function dec2bin(dec: number) {
        return (dec >>> 0).toString(2);
      }

    function dump_cell(original: String, cell: Cell, modified: String) {
        let slice = cell.beginParse();

        let strin = "";
        
        while (true) {
            while(slice.remainingBits > 0)
            strin += Number(slice.loadUint(1));

            if(slice.remainingRefs == 0)
                break;

            slice = slice.loadRef().beginParse();
        }

        console.log('Original: ' + original,
                  '\nModified: ' + strin,
                  '\nExpected: ' + modified);
    }

    it('fun', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b1001), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       console.log(result);
        
    });

    it('a', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b1001), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b100100001001) + dec2bin(0b100100001001));
        
    });

    it('b', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b1), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b100001100001));
        
    });

    it('c', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b11), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b1100001111000011));
        
    });

    it('d', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b111), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b11100001111110000111));
        
    });

    it('e', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b11111), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b1111100001111111111000011111));
        
    });

    it('f', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b11111), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b1111100001111111111000011111));
        
    });

    it('g', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b111), BigInt(0b1), beginCell()
                                                                        .storeUint(0b1, 1)
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b1),
                 result.readCell(),
                 dec2bin(0b1));
        
    });

    it('h', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b1), beginCell()
                                                                            .storeUint(0b1, 1)
                                                                            .storeRef(
                                                                                beginCell()
                                                                                    .storeUint(0b1, 1)
                                                                                    .storeRef(
                                                                                        beginCell()
                                                                                            .storeUint(0b1, 1)
                                                                                            .storeRef(
                                                                                                beginCell()
                                                                                                    .storeUint(0b1, 1)
                                                                                                    .storeRef(
                                                                                                        beginCell()
                                                                                                            .storeUint(0b1, 1)
                                                                                                            .storeRef(
                                                                                                                beginCell()
                                                                                                                    .storeUint(0b1, 1)
                                                                                                                    .storeRef(
                                                                                                                        beginCell()
                                                                                                                            .storeUint(0b1, 1)
                                                                                                                            .storeRef(
                                                                                                                                beginCell()
                                                                                                                                    .storeUint(0b1, 1)
                                                                                                                                .endCell()
                                                                                                                            )
                                                                                                                        .endCell()
                                                                                                                    )
                                                                                                                .endCell()
                                                                                                            )
                                                                                                        .endCell()
                                                                                                    )
                                                                                                .endCell()
                                                                                            )
                                                                                        .endCell()
                                                                                    )
                                                                                .endCell()
                                                                            )
                                                                        .endCell());
                                                                       
       dump_cell(dec2bin(0b11111111),
                 result.readCell(),
                 dec2bin(0b11));
        
    });

    it('i', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b10101), BigInt(0b10), beginCell()
                                                                        .storeUint(0b1010100110011001110101001101, 28)
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b1010100110011001110101001101),
                 result.readCell(),
                 dec2bin(0b1000110011001110001101));
        
    });

    it('j', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b10001), beginCell()
                                                                        .storeUint(BigInt("0b1110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011100001110111"), 238)
                                                                       .endCell());
                                                                       
       dump_cell("1110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011111111110111111111101111111111011100001110111",
                 result.readCell(),
                 "111010001100011101000110001110100011000111010001100011101000110001110100011000111010001100011101000110001");
        
    });

    it('k', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b100001), beginCell()
                                                                        .storeUint(BigInt("0b1010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110101010101010101010101010101010101010111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101111"), 436)
                                                                       .endCell());
                            
        let fixedString = "";

        for(let i = 0; i < 75; ++i) {
            fixedString += "100001";
        }

       dump_cell("1010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110101010101010101010101010101010101010111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101111",
                 result.readCell(),
                 "101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111010101010101010101010101010101010101011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110111011101110100001");

    });
});
