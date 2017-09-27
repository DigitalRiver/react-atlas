Accordion:

     <Accordion>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu. An his nonumy tritani scripserit, essent nostro sadipscing mea te, indoctum referrentur mea eu. Te unum urbanitas usu, et sed partem postea neglegentur. Pri dicunt sensibus ex, est prodesset efficiendi id, senserit eloquentiam sit ex.

                             Ius ea patrioque pertinacia moderatius. Ius errem aliquam splendide te, ne qui exerci diceret mnesarchum. Erant ludus copiosae ad pri, an illum conclusionemque vim. Mel alia consequat in, velit mundi saperet te pro. Tractatos consequuntur id mea.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Third"><Button/></div>
     </Accordion>


Accordion with expand all:

     <Accordion expandAll={true}>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
     </Accordion>

Accordion with multiOpen functionality:

     <Accordion multiOpen={true}>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
     </Accordion>

Accordion with Width set in props as number (This is translated to NUMBERpx)

     <Accordion width={400}>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
     </Accordion>

Accordion with Width set in props as a string

     <Accordion width='50rem'>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
     </Accordion>

Accordion with defined open panel

     <Accordion>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second" expanded>Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
     </Accordion>

Accordion with disabled prop

     <Accordion disabled>
          <div title="First">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Second">Lorem ipsum dolor sit amet, cum alienum splendide te, has ad possim equidem, ad novum insolens usu.</div>
          <div title="Third">this is the third panel</div>
     </Accordion>