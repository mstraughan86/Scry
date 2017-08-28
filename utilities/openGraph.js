module.exports = {
  'openGraph-type': 'openGraphType',
  'openGraph-image': 'openGraphImage',
  'openGraph-imageAltText': 'openGraphImageAlt',
  'facebookAppId': 'ccc',
  'openGraph-imageUrl': 'imageUrl',
  'openGraph-imageSecureUrl': 'imageSecureUrl',
  'openGraph-imageType': 'imageType',
  'openGraph-imageWidth': 'imageWidth',
  'openGraph-imageHeight': 'imageHeight',
  'openGraph-imageAltText': 'imageAltText'
};


/*

if its the homepage, do this

if its the video page, do this instead.

need to find details for each video.

{#openGraph}
{title}
{canonical}
{description}
{facebookAppId}

{#images}
  {openGraph-imageUrl}
  {openGraph-imageSecureUrl}
  {openGraph-imageType}
  {openGraph-imageWidth}
  {openGraph-imageHeight}
  {openGraph-imageAltText}
{:else}
{/images}

{@select key="openGraph-type"}
  {@eq value="video.episode"}

    {openGraph-type}
    {openGraph-videoDuration}
    {openGraph-videoReleaseDate}
    {openGraph-videoTags}
    {openGraph-videoSeries}
  
    {#actors}
      {link}
      {role}
    {:else}
    {/actors}

    {#directors}
      {link}
    {:else}
    {/directors}

    {#writers}
      {link}
    {:else}
    {/writers}

  {/eq}
{/select}

{:else}
{/openGraph}






*/