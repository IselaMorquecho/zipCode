import { render, screen} from "@testing-library/react";
import FormZip from '../components/FormZip';
import userEvent from "@testing-library/user-event";


test('on initial render, the search button is disabled',()=>{
    render(<FormZip/>)
    expect(screen.getByRole('button',{name:'Search'})).toBeDisabled();
})

test('if a country code and zip code are enter, the search button is enabled',()=>{
    render(<FormZip/>)
    userEvent.type(screen.getByLabelText(/code/i),'90210')
    expect(screen.getByRole('button',{name:'Search'})).toBeEnabled();
})

