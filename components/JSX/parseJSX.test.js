import parseJSX from './parseJSX';

const dummyMarkup_HTML = `
    <div class="div">
        <p><a href="#">hello</a> world.</p>

    </div>

    <span class="another_div">
        <img src="img.png" alt="Photo" />
    </span>
`;

const dummyMarkup_JSX = `
    <Section>
        <Paragraph>Hello world</Paragraph>
        <Button kind="primary">Press me</Button>
        <OrderedList>
            <ListItem>One</ListItem>
            <ListItem>Two</ListItem>
        </OrderedList>
    </Section>
`;

describe('parseJSX()', () => {
    test('parse HTML', () => {
        const elements = parseJSX(dummyMarkup_HTML, false, false);

        expect(elements.length).toBe(2);
        expect(elements[1].name).toBe('span');
    });

    test('parse JSX', () => {
        const elements = parseJSX(dummyMarkup_JSX, false, false);

        expect(elements.length).toBe(1);
        expect(elements[0].name).toBe('Section');
        expect(elements[0].elements.length).toBe(3);
    });

    test('parse attributes', () => {
        const elements = parseJSX(dummyMarkup_HTML, false, false);

        expect(elements[1].elements[0].attributes.src).toBe('img.png');
        expect(elements[1].elements[0].attributes.alt).toBe('Photo');
        expect(elements[0].elements[0].elements[0].attributes.href).toBe('#');
    });

    test('support special characters in attributes', () => {
        const elements = parseJSX(`
            <div>
                <span data-special="';:!@#$%^&*()~\`\\|][{}<>,./?-_=+">hello</span> 
                <a href="#">world</a>
            </div>
        `, false, false);

        expect(elements[0].elements.length).toBe(2);
        expect(elements[0].elements[0].attributes['data-special']).toBe('\';:!@#$%^&*()~`\\|][{}<>,./?-_=+');
        expect(elements[0].elements[0].elements[0].text).toBe('hello');
    });

    test('self closing HTML tags', () => {
        const _root = parseJSX('<img src="jsx.jpg" />', false, false);
        const nested = parseJSX('<div><img src="jsx.jpg" /> <button>hello</button></div>', false, false);

        expect(_root.length).toBe(1);
        expect(nested[0].elements.length).toBe(2);
    });

    test('self closing JSX tags', () => {
        const _root = parseJSX('<Image src="jsx.jpg" />', false, false);
        const nested = parseJSX('<Div><Image src="jsx.jpg" /> <Button>hello</Button></Div>', false, false);

        expect(_root.length).toBe(1);
        expect(nested[0].elements.length).toBe(2);
    });
});
