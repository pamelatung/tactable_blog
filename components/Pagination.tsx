interface Props {
	totalPages: number
	currentPage: number
	onPageClick: (value: number) => void
	onBack: () => void
	onNext: () => void
}

const Pagination = ({
	totalPages,
	currentPage,
	onPageClick,
	onBack,
	onNext,
}: Props) => {
		const pageKeys = 
			Array.from(Array(totalPages)
						.keys())
						.map((page) => page + 1)

    return (
			<ul className="uk-pagination" uk-margin>
				<li>
					<a href="#" onClick={() => onBack()}>
						<span uk-pagination-previous>back</span>
					</a>
				</li>
					{
						pageKeys.map((number, index) => {
							const isActive = number === currentPage

							const activeKey = (
								<li className='uk-active' key={index}>
									<span>
										{number}
									</span>
								</li>
							)
							const inactiveKey = (
								<li key={index}>
									<a href="#" onClick={() => onPageClick(number)}>
										{number}
									</a>
								</li>
							)
							
							return isActive ? activeKey : inactiveKey
						})
					}
				<li>
					<a href="#" onClick={() => onNext()}>
						<span uk-pagination-next>next</span>
					</a>
				</li>
			</ul>
		)
}

export default Pagination