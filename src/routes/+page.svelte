<script>
	import Button, { Label } from '@smui/button';
	import Paper, { Title, Content as PaperContent } from '@smui/paper';
	import Card, { Content as CardContent } from '@smui/card';
	import Autocomplete from '@smui-extra/autocomplete';
	import List, { Item as ListItem, Text, Separator } from '@smui/list';
	import Textfield from '@smui/textfield';
	import CircularProgress from '@smui/circular-progress';

	export let data;
	let title = '';
	let author = '';

	const handleSearch = async (txt) => {
		const searchParams = new URLSearchParams({ q: txt });

		const response = await fetch(`https://openlibrary.org/search.json?${searchParams}`);

		const books = await response.json();

		return books?.docs?.map((book) => ({ title: book?.title, author: book?.author_name?.[0] }));
	};

	let searchText = '';

	const handleAddSearchedBook = async (book) => {
		const formData = new FormData();

		formData.append('title', book.title);
		formData.append('author', book.author);

		await fetch('/', { method: 'POST', body: formData });
	};
</script>

<Paper>
	<Title>
		<h1 class="mdc-typography--headline1">Book List</h1>
	</Title>

	<PaperContent>
		<div class="section-padding">
			<h2 class="mdc-typography--headline2">Add a book to the list</h2>
			<List nonInteractive>
				{#if data.results}
					{#each data.results as book}
						<ListItem>
							<span>{book.Title}</span>&nbsp;by&nbsp;<span>{book.Author}</span>
						</ListItem>
						<Separator />
					{/each}
				{/if}
			</List>
		</div>

		<Card class="section-padding" variant="outlined" padded>
			<CardContent>
				<Autocomplete
					bind:searchText
					getOptionLabel={(book) => (book ? `${book.title} - ${book.author}` : '')}
					label="Find Books to add"
					search={handleSearch}
					showMenuWithNoInput={false}
					style="width: 100%;"
					textfield$style="width: 100%;"
				>
					<Text
						slot="loading"
						style="display: flex; width: 100%; justify-content: center; align-items: center;"
					>
						<CircularProgress style="height: 24px; width: 24px;" indeterminate />
					</Text>
				</Autocomplete>
			</CardContent>
		</Card>

		<Card variant="outlined" padded>
			<CardContent>
				<form method="POST">
					<h2 class="mdc-typography--headline2">Add a book to the list</h2>

					<div class="add-book-text-fields">
						<div>
							<Textfield
								bind:value={title}
								input$name="title"
								label="Title"
								style="min-width: 250px; width: 100%;"
							/>
						</div>
						<div>
							<Textfield
								bind:value={author}
								input$name="author"
								label="Author"
								style="min-width: 250px; width: 100%;"
							/>
						</div>
					</div>
					<div>
						<Button variant="outlined">
							<Label>Add</Label>
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	</PaperContent>
</Paper>

<style lang="scss">
	@use '@material/typography/mdc-typography';

	:global(.section-padding) {
		margin-block-end: 3rem;
	}

	.add-book-text-fields {
		margin-block-end: 2rem;
	}
</style>
