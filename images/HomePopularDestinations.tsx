import React from 'react';
import { Box, Chip, Container, Stack, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { startCase } from 'lodash';

const destinations = [
	{
		location: 'barbados',
		searchLink: '/search?country=Barbados',
		comingSoon: false
	},
	{
		location: 'saint-martin',
		searchLink: '/search?country=Saint%20Martin',
		comingSoon: false
	},
	{
		location: 'saint-barthélemy',
		searchLink: '/search?country=Saint%20Barthelemy',
		comingSoon: false
	},
	{
		location: 'palm-springs',
		searchLink: '/search',
		comingSoon: true
	},
	{
		location: 'los-angeles',
		searchLink: '/search',
		comingSoon: true
	},
	{
		location: 'hawaii',
		searchLink: '/search',
		comingSoon: true
	},
	{
		location: 'punta-mita',
		searchLink: '/search',
		comingSoon: true
	}
];

export default function HomePopularDestinations() {
	return (
		<Container>
			<Stack sx={{ pt: 12, pb: 5 }} rowGap={2}>
				<Typography variant='h6' fontWeight='bold'>
					Explore our most popular destinations
				</Typography>
				<Stack
					direction='row'
					sx={{
						overflowX: 'scroll',
						py: 2,
						'::-webkit-scrollbar': {
							height: 0,
							background: 'transparent'
						}
					}}
					columnGap={2}
				>
					{destinations.map((item) => (
						<Stack key={item.location} rowGap={1}>
							<Box
								src={`/${item.location}.png`}
								component='img'
								sx={{
									borderRadius: 2,
									width: 320,
									opacity: item.comingSoon ? 0.5 : 1
								}}
							/>
							{!item.comingSoon ? (
								<MuiLink
									component={Link}
									sx={{ pl: 0.5 }}
									variant='body1'
									color='inherit'
									fontWeight='bold'
									to={item.searchLink}
									underline='hover'
								>
									Explore {startCase(item.location)} {'>'}
								</MuiLink>
							) : (
								<Stack direction='row' columnGap={1} sx={{ alignItems: 'center' }}>
									<Typography variant='body1' sx={{ opacity: 0.3, pl: 0.5 }}>
										{startCase(item.location)}
									</Typography>
									<Chip
										label='Coming soon'
										size='small'
										variant='filled'
										sx={{
											height: 18,
											backgroundColor: '#DBD6CC',
											color: 'white',
											fontWeight: 'bold',
											borderRadius: 1
										}}
									/>
								</Stack>
							)}
						</Stack>
					))}
				</Stack>
			</Stack>
		</Container>
	);
}
