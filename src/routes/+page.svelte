<script>
	export let data;
	let foundBooks = [];

	const debounce = (func, timeout = 300) => {
		let timer;

		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	};

	const debouncedHandleSearch = debounce(async () => {
		const searchParams = new URLSearchParams({ q: searchText });

		try {
			const response = await fetch(`https://openlibrary.org/search.json?${searchParams}`);

			const books = await response.json();

			foundBooks = books?.docs?.map((book) => ({ title: book.title, author: book.author_name[0] }));
		} catch (error) {
			console.error(error);
		}
	}, 1000);

	let searchText = '';

	const handleAddSearchedBook = async (book) => {
		const formData = new FormData();

		formData.append('title', book.title);
		formData.append('author', book.author);

		await fetch('/', { method: 'POST', body: formData });
	};
</script>

<h1>Book List</h1>

<ul>
	{#if data.results}
		{#each data.results as book}
			<li>
				<span>{book.Title}</span> - <span>{book.Author}</span>
			</li>
		{/each}
	{/if}
</ul>

<div>
	<label for="search">Search</label>
	<input type="text" name="search" on:input={debouncedHandleSearch} bind:value={searchText} />
</div>
<div class="dropdown">
	<ul>
		{#each foundBooks as book}
			<li>
				<button on:click={() => handleAddSearchedBook(book)}>{book.title} - {book.author}</button>
			</li>
		{/each}
	</ul>
</div>

<form method="POST">
	<div>
		<label for="title">Title</label>
		<input type="text" name="title" />
	</div>
	<div>
		<label for="author">Author</label>
		<input type="text" name="author" />
	</div>

	<button>Add</button>
</form>
